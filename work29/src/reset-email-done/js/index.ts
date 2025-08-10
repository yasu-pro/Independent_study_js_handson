import { getToken } from "../../feature/token-utils/tokenUtils";
import { isLoginTokenValid } from "../../utils/isLoginTokenValid";
import { deleteResetMailToken } from "./deleteRegisterMailToken";

window.addEventListener("DOMContentLoaded", async () => {
  const loginResult = await isLoginTokenValid();

  if (!loginResult.ok) {
    alert(loginResult.message ?? "トークンが無効です。");
    window.location.href = "../../login/index.html";
    return;
  }

  const extractTokenFromUrl = new URLSearchParams(document.location.search);
  const tokenFromUrl = extractTokenFromUrl.get("token");
  const resetMailToken = getToken("resetMailToken");

  if (!resetMailToken || tokenFromUrl !== resetMailToken) {
    window.location.href = "../../notautherize/index.html";
    return;
  }

  const deletedResult = await deleteResetMailToken(resetMailToken);

  if (!deletedResult.ok) {
    alert(deletedResult.message);
    window.location.href = "../../login/index.html";
  }
});
