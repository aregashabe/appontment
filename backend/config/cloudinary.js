import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = () => {
  try {
    if (!process.env.CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_SECRET_KEY) {
      throw new Error("Cloudinary environment variables are missing.");
    }

    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET_KEY,
    });

    console.log("Cloudinary configured successfully");
  } catch (error) {
    console.error("Error configuring Cloudinary:", error.message);
  }
};

export default connectCloudinary;
