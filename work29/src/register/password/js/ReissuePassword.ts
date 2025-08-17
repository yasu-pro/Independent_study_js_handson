import { REGISTER_PASSWORD_TOKEN } from "../../../constants/tokenKeys/token";
import { setToken } from "../../../feature/token-utils/tokenUtils";

// トークンを発行する
export const requestNewToken = async (): Promise<{
  ok: boolean;
  code: number;
  token?: string;
  message?: string;
}> => {
  try {
    return {
      ok: true,
      code: 200,
      token: REGISTER_PASSWORD_TOKEN,
    };
  } catch (error) {
    return {
      ok: false,
      code: 500,
      message: "サーバーエラー",
    };
  }
};

// パスワードを再発行する
export const requestNewPassword = async (
  newPassword: string
): Promise<{
  ok: boolean;
  code: number;
  message?: string;
}> => {
  try {
    setToken("newPassword", newPassword);
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
