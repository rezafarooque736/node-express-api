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

const deleteFromCloudinary = async resource_id => {
  try {
    if (!resource_id) return null;
    // const response = await cloudinary.uploader.destroy(resource_id);
    const response = await cloudinary.api.delete_resources([resource_id], {
      resource_type: "auto",
      // type: 'upload'
    });

    console.log("file is deleted from cloudinary", response);
    return response;
  } catch (error) {
    console.log("error while deleting file from cloudinary", error);
    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
