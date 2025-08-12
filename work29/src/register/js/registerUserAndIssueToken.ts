import { REGISTER_TOKEN } from "../../constants/tokenKeys/token";
import { setToken, getToken } from "../../feature/token-utils/tokenUtils";

type UserInfoType = {
  mail: string;
  password: string;
};

export const registerUserAndIssueToken = async (
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
    const tokenStr = getToken("loginUserInfo");
    let currentUser: Record<string, string> | null = null;

    if (tokenStr) {
      currentUser = JSON.parse(tokenStr) as Record<string, string>;
    }

    if (currentUser) {
      return {
        ok: false,
        code: 409,
        message: "すでに登録済みです。",
      };
    }

    const newUserInfoJson = JSON.stringify(userInfo);
    const newLoginToken = crypto.randomUUID();
    setToken("loginToken", newLoginToken);
    setToken("loginUserInfo", newUserInfoJson);

    return {
      ok: true,
      code: 200,
      token: REGISTER_TOKEN,
    };
  } catch (error) {
    return {
      ok: false,
      code: 500,
      message: "サーバーエラー",
    };
  }
};
