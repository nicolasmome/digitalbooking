import axios from "axios";
import config, { getAuthorizationConfig } from "./config";

class BrandsService {
  static async getAllBrands({ token }) {
    const newConfig = getAuthorizationConfig(token);
    return axios.get("brands", newConfig).then((resp) => {
      const { data } = resp;
      return data;
    });
  }

  static async getBrandById(brandId, { token }) {
    const newConfig = getAuthorizationConfig(token);
    return axios.get(`brands/${brandId}`, newConfig).then((resp) => {
      const { data } = resp;
      return data;
    });
  }

  static async createBrand(brand, { token }) {
    const newConfig = getAuthorizationConfig(token);
    return axios.post(`brands`, brand, newConfig).then((resp) => {
      const { data } = resp;
      return data;
    });
  }

  static async updateBrand(brand, { token }) {
    const newConfig = getAuthorizationConfig(token);
    return axios.put(`brands`, brand, newConfig).then((resp) => {
      const { data } = resp;
      return data;
    });
  }

  static async deleteBrand(brandId, { token }) {
    const newConfig = getAuthorizationConfig(token);
    return axios.delete(`brands/${brandId}`, newConfig).then((resp) => {
      const { data } = resp;
      return data;
    });
  }
}

export default BrandsService;
