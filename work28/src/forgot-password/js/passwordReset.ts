import { PASSWORD_RESET_TOKEN } from "../../constants/tokenKeys/token";

const storePasswordResetToken = () => {
  localStorage.setItem("passwordResetToken", PASSWORD_RESET_TOKEN);
};

const buildPasswordResetUrl = () => {
  const token = PASSWORD_RESET_TOKEN;
  return `../register/password/index.html?token=${token}`;
};

export const handleForgotPassword = () => {
  storePasswordResetToken();

  return buildPasswordResetUrl();
};
