import axios from "axios";
import config from "./config";

class RolesService {
  static async getAllRoles() {
    return axios.get("rols", config).then((resp) => {
      const { data } = resp;
      return data;
    });
  }

  static async getRoleById(roleId) {
    return axios.get(`rols/${roleId}`, config).then((resp) => {
      const { data } = resp;
      return data;
    });
  }

  static async createRole(role) {
    return axios.post(`rols`, role, config).then((resp) => {
      const { data } = resp;
      return data;
    });
  }

  static async updateRole(role) {
    return axios.put(`rols`, role, config).then((resp) => {
      const { data } = resp;
      return data;
    });
  }

  static async deleteRole(roleId) {
    return axios.delete(`rols/${roleId}`, config).then((resp) => {
      const { data } = resp;
      return data;
    });
  }
}

export default RolesService;
