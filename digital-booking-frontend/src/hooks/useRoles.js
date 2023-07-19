import { useState, useEffect } from "react";
import RolesService from "../services/roles";

const useRoles = ({ id } = {}) => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      let data = [];
      if (id) {
        data = await RolesService.getRoleById(id);
      } else {
        data = await RolesService.getAllRoles();
      }
      setRoles(data);
      setLoading(false);
    } catch (error) {
      setErrors(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createRole = (role) => {
    return RolesService.createRole(role);
  };

  const updateRole = (role) => {
    return RolesService.updateRole(role);
  };

  const deleteRole = (roleId) => {
    return RolesService.deleteRole(roleId);
  };

  return {
    roles,
    setRoles,
    createRole,
    updateRole,
    deleteRole,
    loading,
    errors,
  };
};

export default useRoles;
