import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CreateProjectRequest } from "@/types/project";
import { uploadToCloudinary } from "@/config/upload";

// GET- Get all projects  API-->  /api/projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(projects, {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch projects",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    // Check content type to determine if it's form data or JSON
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      // Handle form data with image upload
      return await handleFormDataRequest(req);
    } else {
      // Handle JSON data (no image upload)
      return await handleJsonRequest(req);
    }
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      {
        error: "Failed to create project",
      },
      {
        status: 500,
      }
    );
  }
}

// Handle JSON request (without image)
async function handleJsonRequest(req: Request) {
  const { title, description, category }: CreateProjectRequest =
    await req.json();

  if (!title) {
    return NextResponse.json(
      {
        error: "Title is required",
      },
      {
        status: 400,
      }
    );
  }

  const project = await prisma.project.create({
    data: {
      title,
      description: description || null,
      category,
    },
  });

  return NextResponse.json(project, { status: 201 });
}

// Handle form data request (with image upload)
async function handleFormDataRequest(req: Request) {
  const formData = await req.formData();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const image = formData.get("image") as File | null;

  if (!title) {
    return NextResponse.json(
      {
        error: "Title is required",
      },
      {
        status: 400,
      }
    );
  }

  let imageUrl = null;

  // Upload image if provided
  if (image && image.size > 0) {
    try {
      const uploadResult = await uploadToCloudinary(image);
      imageUrl = uploadResult.secure_url;
    } catch (uploadError) {
      console.error("Error uploading image:", uploadError);
      return NextResponse.json(
        { error: "Failed to upload image" },
        { status: 500 }
      );
    }
  }

  const project = await prisma.project.create({
    data: {
      title,
      description: description || null,
      category,
      imageUrl,
    },
  });

  return NextResponse.json(project, { status: 201 });
}
