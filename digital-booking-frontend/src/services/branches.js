import axios from "axios";
import config, { getAuthorizationConfig } from "./config";

class BranchesService {
  static async getAllBranches() {
    return axios.get("branches", config).then((resp) => {
      const { data } = resp;
      return data;
    });
  }

  static async getBranchById(branchId) {
    return axios.get(`branches/${branchId}`, config).then((resp) => {
      const { data } = resp;
      return data;
    });
  }

  static async createBranch(branch, { token }) {
    const newConfig = getAuthorizationConfig(token);
    return axios.post(`branches`, branch, newConfig).then((resp) => {
      const { data } = resp;
      return data;
    });
  }

  static async updateBranch(branch, { token }) {
    const newConfig = getAuthorizationConfig(token);
    return axios.put(`branches`, branch, newConfig).then((resp) => {
      const { data } = resp;
      return data;
    });
  }

  static async deleteBranch(brachId, { token }) {
    const newConfig = getAuthorizationConfig(token);
    return axios.delete(`branches/${brachId}`, newConfig).then((resp) => {
      const { data } = resp;
      return data;
    });
  }
}

export default BranchesService;
