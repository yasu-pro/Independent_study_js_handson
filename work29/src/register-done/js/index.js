import { getToken } from "../../feature/token-utils/tokenUtils";
import { isLoginTokenValid } from "../../utils/isLoginTokenValid";
import { deleteRegisterToken } from "./deleteRegisterToken";

window.addEventListener("DOMContentLoaded", async () => {
  const loginResult = await isLoginTokenValid();

  if (!loginResult.ok) {
    alert(loginResult.message ?? "トークンが無効です。");
    window.location.href = "../../login/index.html";
    return;
  }

  const extractTokenFromUrl = new URLSearchParams(document.location.search);
  const tokenFromUrl = extractTokenFromUrl.get("token");
  const registerToken = getToken("registerToken");

  if (!registerToken || tokenFromUrl !== registerToken) {
    window.location.href = "../notautherize/index.html";
    return;
  }

  const deletedResult = await deleteRegisterToken(registerToken);

  if (!deletedResult.ok) {
    alert(deletedResult.message);
    window.location.href = "../login/index.html";

    return;
  }
});
