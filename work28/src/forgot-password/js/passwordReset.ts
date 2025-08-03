import { PASSWORD_RESET_TOKEN } from "../../constants/tokenKeys/token";
import { setToken } from "../../feature/token-utils/tokenUtils";

const buildPasswordResetUrl = () => {
  const token = PASSWORD_RESET_TOKEN;
  return `../register/password/index.html?token=${token}`;
};

export const handleForgotPassword = () => {
  setToken("passwordResetToken", PASSWORD_RESET_TOKEN);

  return buildPasswordResetUrl();
};
