import { REGISTER_MAIL_TOKEN } from "../../constants/tokenKeys/token";
import { getToken, setToken } from "../../feature/token-utils/tokenUtils";

type UserInfoType = {
  mail: string;
  password: string;
};

export const requestNewUserInfoAndToken = async (
  userInfo: UserInfoType
): Promise<{
  ok: boolean;
  code: number;
  mail?: string;
  password?: string;
  token?: string;
  message?: string;
}> => {
  try {
    const requestMail = userInfo.mail;
    const requestPassword = userInfo.password;
    const tokenStr = getToken("loginUserInfo");
    let currentUser: Record<string, string> | null = null;

    if (tokenStr) {
      currentUser = JSON.parse(tokenStr) as Record<string, string>;
    }

    if (currentUser) {
      const currentMail = currentUser.mail;
      const currentPassword = currentUser.password;
      if (requestMail === currentMail) {
        return {
          ok: false,
          code: 409,
          message: "メールアドレスがすでに登録済みです。",
        };
      }

      if (requestPassword !== currentPassword) {
        return {
          ok: false,
          code: 409,
          message: "パスワードが違います。",
        };
      }
    }

    // サーバー側でloginUserInfoを書き換える
    // #TODO 今後バリデーションあったらいいかも
    const newUserInfo = {
      ...userInfo,
      mail: requestMail,
    };
    const newUserInfoJson = JSON.stringify(newUserInfo);
    setToken("loginUserInfo", newUserInfoJson);

    return {
      ok: true,
      code: 200,
      token: REGISTER_MAIL_TOKEN,
    };
  } catch (error) {
    return {
      ok: false,
      code: 500,
      message: "サーバーエラー",
    };
  }
};
