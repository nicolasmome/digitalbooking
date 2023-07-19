/* eslint-disable no-unused-vars */
import axios from "axios";
import config, { getAuthorizationConfig } from "./config";

class ProductsService {
  static async getAllProducts() {
    return axios.get(`instruments`, config).then((resp) => {
      const { data } = resp;
      return data;
    });
  }

  static async getProductById(productId) {
    return axios.get(`instruments/${productId}`, config).then((resp) => {
      const { data } = resp;
      return data;
    });
  }

  static async getProductsByCategory(category) {
    // const newConfig = getAuthorizationConfig(token)
    return axios
      .get(`instruments/category/${category}`, config)
      .then((resp) => {
        const { data } = resp;
        return data;
      });
  }

  static async createProduct(product, { token }) {
    const newConfig = getAuthorizationConfig(token)
    return axios.post(`instruments`, product, newConfig).then((resp) => {
      const { data } = resp;
      return data;
    });
  }

  static async updateProduct(product, { token }) {
    const newConfig = getAuthorizationConfig(token)
    return axios.put(`instruments`, product, newConfig).then((resp) => {
      const { data } = resp;
      return data;
    });
  }

  static async deleteProduct(productId, { token }) {
    const newConfig = getAuthorizationConfig(token)
    return axios.delete(`instruments/${productId}`, newConfig).then((resp) => {
      const { data } = resp;
      return data;
    });
  }
}

export default ProductsService;
