const registerTextElem = document.querySelector(".registerText");
const closeBtn = document.querySelector(".closeBtn");
const modalContentsElem = document.querySelector(".modal_contents");
const registerCheckBox = document.getElementById("register");

const validState = {
  password: false,
};

const passwordInputElem: HTMLInputElement = document.querySelector(
  'input[name="password"]'
);
passwordInputElem.addEventListener("keyup", () => {
  const passwordValue = passwordInputElem.value;
  const invalidElem: HTMLElement = document.querySelector(
    ".invalidError.password"
  );
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (!passwordRegex.test(passwordValue)) {
    invalidElem.style.display = "block";
    validState.password = false;
  } else {
    invalidElem.style.display = "none";
    validState.password = true;
  }

  toggleSubmit();
});

const toggleSubmit = () => {
  const submitBtn: HTMLButtonElement = document.querySelector("js-submitBtn");

  const allValid = Object.values(validState).every(
    (validValue) => validValue === true
  );

  submitBtn.disabled = !allValid;
};

// server内の仮想処理をフロントから呼ぶ
const usersHandler = async (value: {id: string, email: string} | string) => {
    // try-catchは省略
    const users = await fetch("https://6802e9880a99cb7408eab082.mockapi.io/api/v1/users")
    if(users.length === 0){
    return {
        ok: true,
        code: 200,
        message: "empty",
        token: null
      }
    }
    // 2. ここでusersByIdsをArray.reduceで作る。Array.findでもよい。以下はreduceで作った場合
    const user = usersByIds[value] // 3. 存在するかチェック。「ご自身の情報」がAPIに入っていれば見つかるはず
    if(user){
      return {
        ok: true,
        code: 200,
        token: // 4. user.userIdを利用して割り当てる
      }
    }
    return {
      ok: false,
      code: 401,
      message: "Not found"
    }
  }
