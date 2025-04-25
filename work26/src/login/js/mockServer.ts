type User = {
  userId: string;
  name: string;
  email: string;
  password: string;
};

const findMatchingUser = (users, value: { id: string; password: string }) => {
  return users.find((user) => {
    return (
      (user.name === value.id || user.email === value.id) &&
      user.password === value.password
    );
  });
};

export const usersHandler = async (value: { id: string; password: string }) => {
  try {
    const res = await fetch(
      "https://6802e9880a99cb7408eab082.mockapi.io/api/v1/users"
    );
    const users: User[] = await res.json();

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
      };
    }

    return user;
  } catch (error) {
    return {
      ok: false,
      code: 401,
      message: "Not found",
    };
  }
};
