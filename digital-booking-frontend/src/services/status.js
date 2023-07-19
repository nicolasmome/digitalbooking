import axios from "axios";
import { getAuthorizationConfig } from "./config";

class StatusService {
  static async getAllStatus({ token }) {
    const newConfig = getAuthorizationConfig(token);
    return axios.get("status", newConfig).then((resp) => {
      const { data } = resp;
      return data;
    });
  }

  static async getStatusById(statusId, { token }) {
    const newConfig = getAuthorizationConfig(token);
    return axios.get(`status/${statusId}`, newConfig).then((resp) => {
      const { data } = resp;
      return data;
    });
  }

  static async createStatus(status, { token }) {
    const newConfig = getAuthorizationConfig(token);
    return axios.post(`status`, status, newConfig).then((resp) => {
      const { data } = resp;
      return data;
    });
  }

  static async updateStatus(status, { token }) {
    const newConfig = getAuthorizationConfig(token);
    return axios.put(`status`, status, newConfig).then((resp) => {
      const { data } = resp;
      return data;
    });
  }

  static async deleteStatus(statusId, { token }) {
    const newConfig = getAuthorizationConfig(token);
    return axios.delete(`status/${statusId}`, newConfig).then((resp) => {
      const { data } = resp;
      return data;
    });
  }
}

export default StatusService;
