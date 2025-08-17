import { ResponseUserInfo } from "../types/FetchUserInfoMockApiServer";

export function findMatchingUser(users: ResponseUserInfo[], mail: string) {
  return users.find((user) => user.email === mail);
}
