import axios from "axios";
const CLOUD_URL = "https://api.cloudinary.com/v1_1/dgxcs0tsd/upload";

export const uploadFile = async (file, folder) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", folder);
  try {
    const resp = await axios.post(CLOUD_URL, formData);
    if (!resp.ok) throw new Error("Could not upload image.");
    const cloudResp = await resp.json();
    return cloudResp.secure_url;
  } catch (error) {
    throw new Error(error.message);
  }
};
