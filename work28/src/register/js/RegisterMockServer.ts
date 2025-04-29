export const userRegister = (user: { mail: string; password: string }) => {
  if (isUserRegisterNeededServer(user.mail)) {
    localStorage.setItem("registerUserMail", user.mail);
    localStorage.setItem("registerUserPassword", user.password);

    return true;
  }
  return false;
};

const isUserRegisterNeededServer = (userMail: string) => {
  const registerUserInfoServer = localStorage.getItem("registerUserMail");

  if (registerUserInfoServer === userMail) {
    alert("すでに登録されているメールアドレスです。");
    return false;
  }

  return true;
};
