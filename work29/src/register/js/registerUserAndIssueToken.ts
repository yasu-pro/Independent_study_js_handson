import { REGISTER_TOKEN } from "../../constants/tokenKeys/token";
import { fetchMockApiServer } from "../../feature/action/fetchMockApiServer";
import { setToken, getToken } from "../../feature/token-utils/tokenUtils";

type UserInfoType = {
  mail: string;
  password: string;
};

export const registerUserAndIssueToken = async (
  requestUserInfo: UserInfoType
): Promise<{
  ok: boolean;
  code: number;
  mail?: string;
  password?: string;
  token?: string;
  message?: string;
}> => {
  try {
    const requestUserMail = requestUserInfo.mail;
    // ローカルストレージから取得
    const localUserInfoStr = getToken("loginUserInfo");
    const localUserInfo = localUserInfoStr
      ? (JSON.parse(localUserInfoStr) as UserInfoType)
      : null;
    const localUserMail = localUserInfo ? localUserInfo.mail : null;

    // APIから取得
    const mockApiResult = await fetchMockApiServer(requestUserMail);
    const apiUserMail =
      mockApiResult.ok && mockApiResult.mail ? mockApiResult.mail : null;

    // 優先順位: APIのメール → ローカルのメール
    const registerMail = apiUserMail ?? localUserMail;

    if (requestUserMail === registerMail) {
      return {
        ok: false,
        code: 409,
        message: "すでに登録されているメールアドレスです。",
      };
    }

    const newUserInfoJson = JSON.stringify(requestUserInfo);
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
