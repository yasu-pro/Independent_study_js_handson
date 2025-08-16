import { PASSWORD_RESET_TOKEN } from "../../constants/tokenKeys/token";
import { getToken, setToken } from "../../feature/token-utils/tokenUtils";
import { ResponseUserInfo } from "../../types/FetchUserInfoMockApiServer";

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

function findMatchingUser(users: ResponseUserInfo[], mail: string) {
  return users.find((user) => user.email === mail);
}

async function fetchMockApiServer(mail: string) {
  try {
    const res = await fetch(
      "https://6802e9880a99cb7408eab082.mockapi.io/api/v1/users"
    );
    const users: ResponseUserInfo[] = await res.json();

    if (users.length === 0) {
      return { ok: true, code: 200, message: "empty" };
    }

    const user = findMatchingUser(users, mail);

    if (user) {
      return {
        ok: true,
        code: 200,
        mail: user.email,
        password: user.password,
        token: user.userId,
      };
    }

    return { ok: false, code: 401, message: "Not found" };
  } catch {
    return { ok: false, code: 500, message: "サーバーエラー" };
  }
}
