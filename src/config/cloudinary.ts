import { v2 as cloudinary, ConfigOptions } from "cloudinary";
import {
  CloudinaryStorage,
  Options as CloudinaryStorageOptions,
} from "multer-storage-cloudinary";

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

// Configure Cloudinary with proper error handling
const configureCloudinary = (): typeof cloudinary => {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new Error("Missing Cloudinary environment variables");
  }

  const config: ConfigOptions = {
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  };

  cloudinary.config(config);

  return cloudinary;
};

const cloudinaryInstance = configureCloudinary();

// Configure storage for project images
const storage = new CloudinaryStorage({
  cloudinary: cloudinaryInstance,
  params: async (req, file) => {
    return {
      folder: "projects",
      allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
      transformation: [
        { width: 1200, height: 630, crop: "limit", quality: "auto" },
      ],
      public_id: `project_${Date.now()}`,
    };
  },
});

export { cloudinaryInstance as cloudinary, storage };
