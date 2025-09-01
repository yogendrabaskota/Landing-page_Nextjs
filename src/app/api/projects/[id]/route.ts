import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { UpdateProjectRequest } from "@/types/project";

// GET- Get single project    API Endpoints-->  /api/projects/:id
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const projectId = parseInt(params.id);

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

// PATCH -- Update Project  API ENdpoint-->  /api/projects/:id
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const projectId = parseInt(params.id);

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

// DELETE Project   API Endpoints -->   /api/projects/:id
export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  const projectId = parseInt(params.id);

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
