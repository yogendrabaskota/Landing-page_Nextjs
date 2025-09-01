import { NextRequest } from "next/server";
import { cloudinary } from "../config/cloudinary";

export const uploadToCloudinary = async (
  file: File,
  folder: string = "projects"
) => {
  try {
    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert buffer to base64
    const base64String = buffer.toString("base64");
    const dataUri = `data:${file.type};base64,${base64String}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataUri, {
      folder,
      allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
      transformation: [
        { width: 1200, height: 630, crop: "limit", quality: "auto" },
      ],
      public_id: `project_${Date.now()}`,
    });

    return result;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Failed to upload image");
  }
};

export const parseFormData = async (request: NextRequest) => {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const status = formData.get("status") as string;
  const image = formData.get("image") as File | null;

  return { title, description, status, image };
};
