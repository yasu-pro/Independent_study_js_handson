import { REGISTER_MAIL_TOKEN } from "../../constants/tokenKeys/token";

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
