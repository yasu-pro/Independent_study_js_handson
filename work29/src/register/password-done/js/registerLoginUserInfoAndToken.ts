import { getToken } from "../../../feature/token-utils/tokenUtils";

export async function registerLoginUserInfoAndToken(
  requestConfirmPasswordMail: string
): Promise<{
  ok: boolean;
  code: number;
  message?: string;
  mail?: string;
  password?: string;
  loginToken?: string;
}> {
  try {
    if (!requestConfirmPasswordMail) {
      return {
        ok: false,
        code: 409,
        message: "メールアドレスが取得できませんでした。",
      };
    }

    const newPassword = getToken("newPassword");
    if (!newPassword) {
      return {
        ok: false,
        code: 409,
        message: "サーバーに登録情報がありません。",
      };
    }
    const newLoginToken = crypto.randomUUID();

    return {
      ok: true,
      code: 200,
      mail: requestConfirmPasswordMail,
      password: newPassword,
      loginToken: newLoginToken,
    };
  } catch {
    return {
      ok: false,
      code: 500,
      message: "サーバーエラー",
    };
  }
}
