import { useState, useEffect } from "react";
import CategoriesService from "../services/categories";

const useCategories = ({ id } = {}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      let data = [];
      if (id) {
        data = await CategoriesService.getCategoryById(id);
      } else {
        data = await CategoriesService.getAllCategories();
      }
      setCategories(data);
      setLoading(false);
    } catch (error) {
      setErrors(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createCategory = (category) => {
    return CategoriesService.createCategory(category);
  };

  const updateCategory = (category) => {
    return CategoriesService.updateCategory(category);
  };

  const deleteCategory = (categoryId) => {
    return CategoriesService.deleteCategory(categoryId);
  };

  return {
    categories,
    setCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    loading,
    errors,
  };
};

export default useCategories;
