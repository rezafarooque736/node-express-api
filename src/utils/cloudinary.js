import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { config } from "../config/config.js";

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async localFilePath => {
  try {
    if (!localFilePath) return null;

    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // file has been uploaded on cloudinary
    console.log("file is uploaded on cloudinary", response.url);

    // delete the file from local storage
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the file has been uploaded on cloudinary.

    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed.
    console.log("error while uploading file on cloudinary", error);
    return null;
  }
};

export default uploadOnCloudinary;
