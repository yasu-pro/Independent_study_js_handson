import { REGISTER_MAIL_TOKEN } from "../../constants/tokenKeys/token";
import {
  getToken,
  removeToken,
  setToken,
} from "../../feature/token-utils/tokenUtils";
import { ResponseUserInfo } from "../../types/FetchUserInfoMockApiServer";

type UserInfoType = {
  mail: string;
  password: string;
};

export const requestNewUserInfoAndToken = async (
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
    const requestUserPassword = requestUserInfo.password;
    // ローカルストレージから取得
    const localUserInfoStr = getToken("loginUserInfo");
    const localUserInfo = localUserInfoStr
      ? (JSON.parse(localUserInfoStr) as UserInfoType)
      : null;
    const localUserMail = localUserInfo ? localUserInfo.mail : null;
    const localUserPassword = localUserInfo ? localUserInfo.password : null;

    // APIから取得
    const mockApiResult = await fetchMockApiServer(requestUserMail);
    const apiUserMail =
      mockApiResult.ok && mockApiResult.mail ? mockApiResult.mail : null;
    const apiUserPassword =
      mockApiResult.ok && mockApiResult.password
        ? mockApiResult.password
        : null;

    // 優先順位: APIのメール → ローカルのメール
    const registerMail = apiUserMail ?? localUserMail;
    const registerPassword = apiUserPassword ?? localUserPassword;

    if (requestUserMail === registerMail) {
      return {
        ok: false,
        code: 409,
        message: "すでに登録されているメールアドレスです。",
      };
    }

    if (requestUserPassword !== registerPassword) {
      return {
        ok: false,
        code: 409,
        message: "パスワードが違います。",
      };
    }

    // サーバー側でloginUserInfoを書き換える
    // #TODO 今後バリデーションあったらいいかも
    const newUserInfo = {
      ...requestUserInfo,
      mail: requestUserMail,
    };
    const newUserInfoJson = JSON.stringify(newUserInfo);
    const newLoginToken = crypto.randomUUID();
    removeToken("loginToken");
    setToken("loginToken", newLoginToken);
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
