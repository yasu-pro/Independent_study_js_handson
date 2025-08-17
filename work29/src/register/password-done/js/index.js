import { getToken, removeToken, setToken } from "../../../utils/tokenUtils.ts";
import { registerLoginUserInfoAndToken } from "../../../server/register/password-done/registerLoginUserInfoAndToken.ts";

window.addEventListener("DOMContentLoaded", async () => {
  const extractTokenFromUrl = new URLSearchParams(document.location.search);
  const tokenFromUrl = extractTokenFromUrl.get("token");

  const registerPasswordToken = getToken("registerPasswordToken");
  const confirmPasswordMail = getToken("confirmPasswordMail");

  if (!confirmPasswordMail || tokenFromUrl !== registerPasswordToken) {
    window.location.href = "../notautherize/index.html";

    return;
  }

  const result = await registerLoginUserInfoAndToken(confirmPasswordMail);
  removeToken("newPassword");
  removeToken("confirmPasswordMail");
  removeToken("registerPasswordToken");

  if (!result.ok) {
    alert(result.message);
    return;
  }

  const loginUserInfo = {
    mail: result.mail,
    password: result.password,
  };

  const loginUserInfoStr = JSON.stringify(loginUserInfo);

  setToken("loginUserInfo", loginUserInfoStr);
  setToken("loginToken", result.loginToken);
});
