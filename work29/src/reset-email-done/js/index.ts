import { getToken, removeToken } from "../../feature/token-utils/tokenUtils";
import { isLoginTokenValid } from "../../utils/isLoginTokenValid";

window.addEventListener("DOMContentLoaded", async () => {
  const result = await isLoginTokenValid();

  if (!result.ok) {
    alert(result.message ?? "トークンが無効です。");
    window.location.href = "../../login/index.html";
    return;
  }

  const extractTokenFromUrl = new URLSearchParams(document.location.search);
  const tokenFromUrl = extractTokenFromUrl.get("token");

  const registerMailToken = getToken("registerMailToken");

  if (tokenFromUrl === registerMailToken) return;

  removeToken("registerMailToken");
  window.location.href = "../../notautherize/index.html";
});
