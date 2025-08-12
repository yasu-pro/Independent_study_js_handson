import { getToken, removeToken } from "../../feature/token-utils/tokenUtils";

export const deleteRegisterToken = async (
  requestRegisterToken: string
): Promise<{
  ok: boolean;
  code: number;
  message?: string;
}> => {
  try {
    if (!requestRegisterToken) {
      return {
        ok: false,
        code: 409,
        message: "トークンが無効です。",
      };
    }

    const registerToken = getToken("registerToken"); // サーバー(localStorageの値)
    if (!registerToken) {
      return {
        ok: false,
        code: 409,
        message: "サーバーにトークンがありません",
      };
    }

    if (requestRegisterToken && registerToken) {
      removeToken("registerToken");
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
