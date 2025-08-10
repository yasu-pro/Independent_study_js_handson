import { getToken } from "../feature/token-utils/tokenUtils";

/**
 * トークンが有効かどうか判定する
 * localStorageの該当キーに値があるかどうかを簡易チェック
 * @param key トークン保存キー名
 * @param token チェックしたいトークンの値
 * @returns boolean 有効ならtrue、無効ならfalse
 */
export const isTokenValid = (key: string, token: string): boolean => {
  if (!key || !token) return false;

  const storedToken = getToken(key);
  return storedToken === token;
};
