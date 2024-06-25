import http from "../services/api";

interface SignUpRequestAuth {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface SignInRequestAuth {
  email: string;
  password: string;
}

const AuthService = {
  login: async (data: SignInRequestAuth) => {
    const { email, password } = data;
    if (!email || !password) {
      return "All fields are required";
    } else {
      return http
        .post("/auth/signin", { email, password })
        .then((response: any) => {
          if (response.data.token) {
            return response.data.token;
          }
          return null;
        });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  register: async (data: SignUpRequestAuth) => {
    const { name, username, email, password } = data;
    if (!name || !username || !email || !password) {
      //   return res
      //     .status(StatusCodes.BAD_REQUEST)
      //     .json({ message: "All fields are required" });
    }
  },
};

export default AuthService;
