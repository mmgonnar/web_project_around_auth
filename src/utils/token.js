const TOKEN_KEY = "jwt";

export default setToken = (token) => localStorage.setItem(TOKEN_KEY, token);

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  return localStorage.removeItem(TOKEN_KEY);
};
