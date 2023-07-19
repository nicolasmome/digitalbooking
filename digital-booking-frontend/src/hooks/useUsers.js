import { useState, useEffect } from "react";
import UsersService from "../services/users";

const useUsers = ({ id } = {}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      let data = [];
      if (id) {
        data = await UsersService.getUserById(id);
      } else {
        data = await UsersService.getAllUsers();
      }
      setUsers(data);
      setLoading(false);
    } catch (error) {
      setErrors(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createUser = async (user) => {
    return UsersService.createUser(user);
  };

  const updateUser = (user) => {
    return UsersService.updateUser(user);
  };

  const deleteUser = (userId) => {
    return UsersService.deleteUser(userId);
  };

  return {
    users,
    setUsers,
    createUser,
    updateUser,
    deleteUser,
    loading,
    errors,
  };
};

export default useUsers;
