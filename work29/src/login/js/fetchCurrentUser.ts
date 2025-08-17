import { getToken } from "../../feature/token-utils/tokenUtils";

export async function fetchCurrentUser(): Promise<{
  ok: boolean;
  code: number;
  message?: string;
}> {
  try {
    const loginToken = getToken("loginToken");
    if (!loginToken) {
      return {
        ok: false,
        code: 409,
        message: "サーバーにログイントークンがありません。",
      };
    }

    const loginUserStr = getToken("loginUserInfo");
    if (!loginUserStr) {
      return {
        ok: false,
        code: 409,
        message: "サーバーにユーザー情報がありません。",
      };
    }

    return {
      ok: true,
      code: 200,
    };
  } catch {
    return {
      ok: false,
      code: 500,
      message: "サーバーエラー",
    };
  }
}
