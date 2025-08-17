import { PASSWORD_RESET_TOKEN } from "../../constants/tokenKeys/token";
import { fetchMockApiServer } from "../fetchMockApiServer";
import { getToken, setToken } from "../../utils/tokenUtils";

export async function passwordResetToken(requestMail: string): Promise<{
  ok: boolean;
  code: number;
  token?: string;
  message?: string;
}> {
  try {
    // ローカルストレージから取得
    const localUserInfoStr = getToken("loginUserInfo");
    const localUserMail = localUserInfoStr
      ? (JSON.parse(localUserInfoStr) as string)
      : null;

    // APIから取得
    const mockApiResult = await fetchMockApiServer(requestMail);
    const apiUserMail =
      mockApiResult.ok && mockApiResult.mail ? mockApiResult.mail : null;

    // 優先順位: APIのメール → ローカルのメール
    const registerMail = apiUserMail ?? localUserMail;

    if (!registerMail || requestMail !== registerMail) {
      return {
        ok: false,
        code: 409,
        message: "一致するアカウントが見つかりませんでした",
      };
    }

    setToken("confirmPasswordMail", registerMail);
    setToken("passwordResetToken", PASSWORD_RESET_TOKEN);
    return {
      ok: true,
      code: 200,
      token: PASSWORD_RESET_TOKEN,
    };
  } catch {
    return {
      ok: false,
      code: 500,
      message: "サーバーエラー",
    };
  }
}
