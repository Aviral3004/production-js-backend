//todo:  Assuming that we have the file on the server
//todo: from there we will continue to upload it to cloudinary

import { v2 as cloudinary } from "cloudinary"
import fs from "fs" //! from this file system package we will extract the file path of the file

//! then we can use file unlink to remove the file from server (in simple terms delete it once it has uploaded to cloudinary)

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

//! For uploading file to cloudinary as well as unlinking it from server
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null
    //! upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", //! to detect which type of file is to be uploaded - by default put it auto
    })
    //! file has been uploaded succesfully
    console.log("File has been uploaded on cloudinary ", response.url)
    return response
  } catch (error) {
    fs.unlinkSync(localFilePath) //! remove the locally saved temporary file as the upload operation got failed!
    return null
  }
}

export { uploadOnCloudinary }
