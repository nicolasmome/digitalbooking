const config = {
  baseURL: "http://localhost:8080",
};

export const getAuthorizationConfig = (token) => {
  return {
    ...config,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export default config;
