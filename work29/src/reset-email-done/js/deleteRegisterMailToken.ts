import { getToken, removeToken } from "../../feature/token-utils/tokenUtils";

export const deleteResetMailToken = async (
  requestResetMailToken: string
): Promise<{
  ok: boolean;
  code: number;
  message?: string;
}> => {
  try {
    if (!requestResetMailToken) {
      return {
        ok: false,
        code: 409,
        message: "トークンが無効です。",
      };
    }

    const resetMailToken = getToken("resetMailToken"); // サーバー(localStorageの値)
    if (!resetMailToken) {
      return {
        ok: false,
        code: 409,
        message: "サーバーにトークンがありません",
      };
    }

    if (requestResetMailToken && resetMailToken) {
      removeToken("resetMailToken");
    }

    return {
      ok: true,
      code: 200,
    };
  } catch (error) {
    return {
      ok: false,
      code: 500,
      message: "サーバーエラー",
    };
  }
};
