import { useState, useEffect } from "react";
import BranchesService from "../services/branches";
import { useApp } from "../context/AppContext";

const useBranches = ({ id } = {}) => {
  const { user } = useApp();
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      let data = [];
      if (id) {
        data = await BranchesService.getBranchById(id);
      } else {
        data = await BranchesService.getAllBranches();
      }
      setBranches(data);
      setLoading(false);
    } catch (error) {
      setErrors(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createBranch = (branch) => {
    return BranchesService.createBranch(branch, { token: user?.token });
  };

  const updateBranch = (branch) => {
    return BranchesService.updateBranch(branch, { token: user?.token });
  };

  const deleteBranch = (branchId) => {
    return BranchesService.deleteBranch(branchId, { token: user?.token });
  };

  return {
    branches,
    setBranches,
    createBranch,
    updateBranch,
    deleteBranch,
    loading,
    errors,
  };
};

export default useBranches;
