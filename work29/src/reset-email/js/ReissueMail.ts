import { REGISTER_MAIL_TOKEN } from "../../constants/tokenKeys/token";
import { getToken } from "../../feature/token-utils/tokenUtils";

export const requestNewMailAndToken = async (
  newMail: string
): Promise<{
  ok: boolean;
  code: number;
  mail?: string;
  token?: string;
  message?: string;
}> => {
  try {
    const tokenStr = getToken("registerUser");
    let currentUser: Record<string, string> | null = null;

    if (tokenStr) {
      currentUser = JSON.parse(tokenStr) as Record<string, string>;
    }

    if (currentUser) {
      const currentMail = currentUser.mail;
      if (newMail === currentMail) {
        return {
          ok: false,
          code: 409,
          message: "メールアドレスがすでに登録済みです。",
        };
      }
    }

    return {
      ok: true,
      code: 200,
      mail: newMail,
      token: REGISTER_MAIL_TOKEN, // 新しい有効なトークン
    };
  } catch (error) {
    return {
      ok: false,
      code: 500,
      message: "サーバーエラー",
    };
  }
};
