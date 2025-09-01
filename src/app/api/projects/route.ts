import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CreateProjectRequest } from "@/types/project";

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

// POST- Create Projects   API-->   /api/projects
export async function POST(req: Request) {
  try {
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
