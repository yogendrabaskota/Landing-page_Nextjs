// Helper function to extract public ID from Cloudinary URL
export function extractPublicIdFromCloudinaryUrl(url: string): string | null {
  try {
    // https://res.cloudinary.com/cloudname/image/upload/v1234567890/folder/public_id.jpg

    // Extract the path after /upload/
    const uploadIndex = url.indexOf("/upload/");
    if (uploadIndex === -1) return null;

    const pathAfterUpload = url.substring(uploadIndex + 8); // +8 to skip '/upload/'

    // Remove version part if it exists (v1234567890/)
    const versionRegex = /^v\d+\//;
    const pathWithoutVersion = pathAfterUpload.replace(versionRegex, "");

    // Remove file extension
    const lastDotIndex = pathWithoutVersion.lastIndexOf(".");
    if (lastDotIndex !== -1) {
      return pathWithoutVersion.substring(0, lastDotIndex);
    }

    return pathWithoutVersion;
  } catch (error) {
    console.error("Error extracting public ID from URL:", error);
    return null;
  }
}
