import axios from "axios";
import config from "./config";

class AuthService {
  static async loginWithEmailAndPassword(userCredentials) {
    return axios.post(`login`, userCredentials, config).then((resp) => {
      const { data } = resp;
      return data;
    });
  }
}

export default AuthService;
