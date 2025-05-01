export const userRegister = (user: { mail: string; password: string }) => {
  if (isUserRegisterNeededServer(user.mail)) {
    const registerUserJson = JSON.stringify(user);
    localStorage.setItem("registerUser", registerUserJson);

    return true;
  }
  return false;
};

const isUserRegisterNeededServer = (userMail: string) => {
  const registerUserInfoServer = localStorage.getItem("registerUser");

  if (!registerUserInfoServer) {
    return true;
  }

  const registerUserJson = JSON.parse(registerUserInfoServer);

  if (registerUserJson.mail === userMail) {
    alert("すでに登録されているメールアドレスです。");
    return false;
  }

  return true;
};
