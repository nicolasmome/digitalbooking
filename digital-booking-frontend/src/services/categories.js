import axios from "axios";
import config, { getAuthorizationConfig } from "./config";

class CategoriesService {
  static async getAllCategories() {
    return axios.get("categories", config).then((resp) => {
      const { data } = resp;
      return data;
    });
  }

  static async getCategoryById(categoryId) {
    return axios.get(`categories/${categoryId}`, config).then((resp) => {
      const { data } = resp;
      return data;
    });
  }

  static async createCategory(category, { token }) {
    const newConfig = getAuthorizationConfig(token);
    return axios.post(`categories`, category, newConfig).then((resp) => {
      const { data } = resp;
      return data;
    });
  }

  static async updateCategory(category, { token }) {
    const newConfig = getAuthorizationConfig(token);
    return axios.put(`categories`, category, newConfig).then((resp) => {
      const { data } = resp;
      return data;
    });
  }

  static async deleteCategory(categoryId, { token }) {
    const newConfig = getAuthorizationConfig(token);
    return axios.delete(`categories/${categoryId}`, newConfig).then((resp) => {
      const { data } = resp;
      return data;
    });
  }
}

export default CategoriesService;
