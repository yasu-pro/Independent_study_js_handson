import { ResponseUserInfo } from "../../types/FetchUserInfoMockApiServer";
import { findMatchingUser } from "../../utils/findMatchingUser";

export async function fetchMockApiServer(mail: string) {
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
