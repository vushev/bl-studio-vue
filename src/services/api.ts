import store from "@/store";
import axios from "axios";

const http = axios.create({
  baseURL: process.env.VUE_APP_API_ROOT,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(
  async (req) => {
    try {
      // console.log('Sending request:', req);
    } catch (err) {
      console.error("Request Interceptor Failed", err);
    }
    
    return req;
  },
  (err) => {
    console.error("Request Interceptor Failed", err);

    return Promise.reject(err);
  }
);

http.interceptors.response.use(
  (response) => response,
  async (err) => {
    if (err?.response) {
      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      } else if ([401].includes(err.response.status)) {
        if (
          (err.response.data?.message === "jwt expired" ||
            store.state.isAuthenticated) &&
          err.config.url !== "/auth/verify-auth"
        ) {
          store.dispatch("logout");
          window.location.href = "/login";
          return Promise.reject(err.response.data);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default http;
