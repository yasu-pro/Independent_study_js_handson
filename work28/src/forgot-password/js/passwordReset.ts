import { passwordResetToken } from "../../constants/token";

const storePasswordResetToken = () => {
  localStorage.setItem("token", passwordResetToken);
};

const buildPasswordResetUrl = () => {
  const token = passwordResetToken;
  return `../register-done/password/index.html?token=${token}`;
};

export const handleForgotPassword = () => {
  storePasswordResetToken();

  return buildPasswordResetUrl();
};
