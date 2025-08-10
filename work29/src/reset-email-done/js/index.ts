import { removeToken } from "../../feature/token-utils/tokenUtils";
import { isLoginTokenValid } from "../../utils/isLoginTokenValid";

window.addEventListener("DOMContentLoaded", async () => {
  const result = await isLoginTokenValid();

  if (!result.ok) {
    alert(result.message ?? "トークンが無効です。");
    window.location.href = "../../login/index.html";
    return;
  }

  // クリーンアップは最後に実施
  //   removeToken("loginToken");
});
