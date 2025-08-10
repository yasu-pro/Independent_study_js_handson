export function setToken(key: string, value: any) {
  const storeValue = typeof value === "string" ? value : JSON.stringify(value);
  localStorage.setItem(key, storeValue);
}

export const getToken = (key: string): string | null => {
  return localStorage.getItem(key);
};

export const removeToken = (key: string) => {
  localStorage.removeItem(key);
};
