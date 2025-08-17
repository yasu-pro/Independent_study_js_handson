import { REGISTER_TOKEN } from "../../constants/tokenKeys/token";
import { setToken, getToken } from "../../feature/token-utils/tokenUtils";
import { ResponseUserInfo } from "../../types/FetchUserInfoMockApiServer";

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

function findMatchingUser(users: ResponseUserInfo[], mail: string) {
  return users.find((user) => user.email === mail);
}

async function fetchMockApiServer(mail: string) {
  try {
    const res = await fetch(
      "https://6802e9880a99cb7408eab082.mockapi.io/api/v1/users"
    );
    const users: ResponseUserInfo[] = await res.json();

    if (users.length === 0) {
      return { ok: true, code: 200, message: "empty" };
    }

    const user = findMatchingUser(users, mail);

    if (user) {
      return {
        ok: true,
        code: 200,
        mail: user.email,
        password: user.password,
        token: user.userId,
      };
    }

    return { ok: false, code: 401, message: "Not found" };
  } catch {
    return { ok: false, code: 500, message: "サーバーエラー" };
  }
}
