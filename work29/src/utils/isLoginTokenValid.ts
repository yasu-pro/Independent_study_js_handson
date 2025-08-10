import { getToken } from "../feature/token-utils/tokenUtils";

export const isLoginTokenValid = async (): Promise<{
  ok: boolean;
  code: number;
  message?: string;
}> => {
  try {
    const token = getToken("loginToken");

    if (!token) {
      return {
        ok: false,
        code: 401,
        message: "トークンが存在しません。",
      };
    }

    return {
      ok: true,
      code: 200,
    };
  } catch (error) {
    return {
      ok: false,
      code: 500,
      message: "サーバーエラー（ローカル判定）",
    };
  }
};
