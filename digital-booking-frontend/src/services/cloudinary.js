import axios from "axios";

const CLOUD_URL = "https://api.cloudinary.com/v1_1/dgxcs0tsd/image/upload";

class CloudinaryService {
  static async uploadFile(file) {
    return axios.post(CLOUD_URL, file).then((resp) => {
      const { data } = resp;
      return data;
    });
  }
}

export default CloudinaryService;
