import { ResponseUserInfo } from "../../types/FetchUserInfoMockApiServer";

const findMatchingUser = (
  users: ResponseUserInfo[],
  value: { mail: string; password: string }
) => {
  return users.find((user) => {
    return user.email === value.mail && user.password === value.password;
  });
};

export const fetchLoginAndUserInfo = async (value: {
  mail: string;
  password: string;
}) => {
  try {
    const res = await fetch(
      "https://6802e9880a99cb7408eab082.mockapi.io/api/v1/users"
    );
    const users: ResponseUserInfo[] = await res.json();

    if (users.length === 0) {
      return {
        ok: true,
        code: 200,
        message: "empty",
        token: null,
      };
    }

    const user = findMatchingUser(users, value);

    if (user) {
      return {
        ok: true,
        code: 200,
        token: user.userId,
        mail: user.email,
        password: user.password,
      };
    }

    return {
      ok: false,
      code: 401,
      message: "Not found",
    };
  } catch (error) {
    return {
      ok: false,
      code: 500,
      message: "サーバーエラー",
    };
  }
};
