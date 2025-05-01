import { forgotPasswordToken } from "../../constants/token";

const setLocalStorageToken = () => {
  localStorage.setItem("token", forgotPasswordToken);
};

const generatePasswordResetUrl = () => {
  const token = forgotPasswordToken;
  return `../register-done/password/index.html?token=${token}`;
};

export const forgotPassword = () => {
  setLocalStorageToken();

  return generatePasswordResetUrl();
};
