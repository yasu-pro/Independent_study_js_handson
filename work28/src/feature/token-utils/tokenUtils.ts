export const setToken = (key: string, token: string) => {
  localStorage.setItem(key, token);
};

export const getToken = (key: string): string | null => {
  return localStorage.getItem(key);
};

export const removeToken = (key: string) => {
  localStorage.removeItem(key);
};
