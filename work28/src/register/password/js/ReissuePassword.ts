const newToken = "tagaerega";

// トークンを発行する
export const reissueToken = async (): Promise<{
  ok: boolean;
  code: number;
  token?: string;
  message?: string;
}> => {
  try {
    return {
      ok: true,
      code: 200,
      token: newToken,
    };
  } catch (error) {
    return {
      ok: false,
      code: 500,
      message: "サーバーエラー",
    };
  }
};

// パスワードを再発行する
export const reissuePassword = async (
  reissuePassword: string
): Promise<{
  ok: boolean;
  code: number;
  password?: string;
  message?: string;
}> => {
  try {
    return {
      ok: true,
      code: 200,
      password: reissuePassword,
    };
  } catch (error) {
    return {
      ok: false,
      code: 500,
      message: "サーバーエラー",
    };
  }
};
