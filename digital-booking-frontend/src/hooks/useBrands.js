import { useState, useEffect } from "react";
import BrandsService from "../services/brands";
import { useApp } from "../context/AppContext";

const useBrands = ({ id } = {}) => {
  const { user } = useApp();
  const { token } = user;
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      let data = [];
      if (id) {
        data = await BrandsService.getBrandById(id, { token });
      } else {
        data = await BrandsService.getAllBrands({ token });
      }
      setBrands(data);
      setLoading(false);
    } catch (error) {
      setErrors(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createBrand = (brand) => {
    return BrandsService.createBrand(brand, { token });
  };

  const updateBrand = (brand) => {
    return BrandsService.updateBrand(brand, { token });
  };

  const deleteBrand = (brandtId) => {
    return BrandsService.deleteBrand(brandtId, { token });
  };

  return {
    brands,
    setBrands,
    createBrand,
    updateBrand,
    deleteBrand,
    loading,
    errors,
  };
};

export default useBrands;
