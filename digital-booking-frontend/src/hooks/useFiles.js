import { useState } from "react";
import CloudinaryService from "../services/cloudinary";

const useFiles = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const uploadFile = async (file, folder) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", folder);
    try {
      const file = await CloudinaryService.uploadFile(formData);
      return file.secure_url;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const uploadFiles = async (files, folder) => {
    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(uploadFile(file, folder));
    }
    setLoading(true);
    try {
      const imageUrls = await Promise.all(fileUploadPromises);
      setUrls(imageUrls);
      setLoading(false);
      return imageUrls;
    } catch (errors) {
      setLoading(false);
      setErrors(errors);
    }
  };

  return {
    urls,
    uploadFiles,
    loading,
    errors,
  };
};

export default useFiles;
