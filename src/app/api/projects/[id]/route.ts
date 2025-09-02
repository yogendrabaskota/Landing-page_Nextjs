import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { UpdateProjectRequest } from "@/types/project";
import { uploadToCloudinary } from "@/config/upload";
import { cloudinary } from "@/config/cloudinary";
import { extractPublicIdFromCloudinaryUrl } from "@/lib/cloudinary.utils";

// GET- Get single project    API Endpoints-->  /api/projects/:id
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const projectId = parseInt(id);

  if (isNaN(projectId)) {
    return NextResponse.json(
      {
        error: "Invalid project ID",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      return NextResponse.json(
        {
          error: "Project not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch project",
      },
      {
        status: 500,
      }
    );
  }
}

// PATCH -- Update Project  API Endpoint-->  /api/projects/:id
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const projectId = parseInt(id);

  if (isNaN(projectId)) {
    return NextResponse.json(
      {
        error: "Invalid project ID",
      },
      {
        status: 400,
      }
    );
  }

  try {
    // Check if project exists first
    const existingProject = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!existingProject) {
      return NextResponse.json(
        {
          error: "Project not found",
        },
        {
          status: 404,
        }
      );
    }

    // Check content type to determine if it's form data or JSON
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      // Handle form data with image upload
      return await handleFormDataUpdate(req, projectId, existingProject);
    } else {
      // Handle JSON data (no image upload)
      return await handleJsonUpdate(req, projectId);
    }
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      {
        error: "Failed to update project",
      },
      {
        status: 500,
      }
    );
  }
}

// Handle JSON update (without image)
async function handleJsonUpdate(req: Request, projectId: number) {
  const { title, description, category }: UpdateProjectRequest =
    await req.json();

  const project = await prisma.project.update({
    where: { id: projectId },
    data: {
      ...(title && { title }),
      ...(description !== undefined && { description }),
      ...(category && { category }),
    },
  });

  return NextResponse.json(project, { status: 200 });
}

// Handle form data update (with image upload)
async function handleFormDataUpdate(
  req: Request,
  projectId: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  existingProject: any
) {
  const formData = await req.formData();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const image = formData.get("image") as File | null;
  const removeImage = formData.get("removeImage") as string; // Optional flag to remove image

  let imageUrl: string | null | undefined = undefined;
  let oldImageUrlToDelete: string | null = null;

  // Handle image removal if requested
  if (removeImage === "true") {
    imageUrl = null;
    // Mark existing image for deletion if it exists
    if (existingProject.imageUrl) {
      oldImageUrlToDelete = existingProject.imageUrl;
    }
  }
  // Upload new image if provided
  else if (image && image.size > 0) {
    try {
      const uploadResult = await uploadToCloudinary(image);
      imageUrl = uploadResult.secure_url;

      // Mark existing image for deletion if it exists and a new image is being uploaded
      if (existingProject.imageUrl) {
        oldImageUrlToDelete = existingProject.imageUrl;
      }
    } catch (uploadError) {
      console.error("Error uploading image:", uploadError);
      return NextResponse.json(
        { error: "Failed to upload image" },
        { status: 500 }
      );
    }
  }
  // If no image change, keep the existing image
  else {
    imageUrl = undefined; // Don't update the imageUrl field
  }

  // Update the project in database
  const project = await prisma.project.update({
    where: { id: projectId },
    data: {
      ...(title && { title }),
      ...(description && { description }),
      ...(category && { category }),
      ...(imageUrl !== undefined && { imageUrl }),
    },
  });

  // Delete old image from Cloudinary after successful update
  if (oldImageUrlToDelete) {
    try {
      const publicId = extractPublicIdFromCloudinaryUrl(oldImageUrlToDelete);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
        console.log(`Deleted old image from Cloudinary: ${publicId}`);
      }
    } catch (deleteError) {
      console.error("Error deleting old image from Cloudinary:", deleteError);
      // Don't fail the request if image deletion fails, just log it
    }
  }

  return NextResponse.json(project, { status: 200 });
}

// DELETE Project   API Endpoints -->   /api/projects/:id

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const projectId = parseInt(id);

  if (isNaN(projectId)) {
    return NextResponse.json(
      {
        error: "Invalid project ID",
      },
      {
        status: 400,
      }
    );
  }

  try {
    // Get project first to handle image deletion from Cloudinary
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return NextResponse.json(
        {
          error: "Project not found",
        },
        {
          status: 404,
        }
      );
    }

    // Delete image from Cloudinary
    if (project.imageUrl) {
      try {
        const publicId = extractPublicIdFromCloudinaryUrl(project.imageUrl);
        if (publicId) {
          await cloudinary.uploader.destroy(publicId);
          console.log(`Deleted image from Cloudinary: ${publicId}`);
        }
      } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
        // Continue with project deletion even if image deletion fails
      }
    }

    await prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    return NextResponse.json(
      {
        message: "Project deleted successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      {
        error: "Failed to delete project",
      },
      {
        status: 500,
      }
    );
  }
}
