import axios from "axios";
import config from "./config";

class UsersService {
  static async getAllUsers() {
    return axios.get(`users`, config).then((resp) => {
      const { data } = resp;
      return data;
    });
  }

  static async getUserById(userId) {
    return axios.get(`users/${userId}`, config).then((resp) => {
      const { data } = resp;
      return data;
    });
  }

  static async createUser(user) {
    return axios.post(`users`, user, config).then((resp) => {
      const { data } = resp;
      return data;
    });
  }

  static async updateUser(user) {
    return axios.put(`users`, user, config).then((resp) => {
      const { data } = resp;
      return data;
    });
  }

  static async deleteUser(userId) {
    return axios.delete(`users/${userId}`, config).then((resp) => {
      const { data } = resp;
      return data;
    });
  }
}

export default UsersService;
