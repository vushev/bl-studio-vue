import store from "@/store";
import axios from "axios";

const http = axios.create({
  baseURL: process.env.VUE_APP_API_ROOT,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  },
});

http.interceptors.request.use(
  async (req) => {
    try {
      // console.log('Sending request:', req);
      const token = localStorage.getItem("token");
      if (token) {
        req.headers["Authorization"] = `Bearer ${token}`;
        console.log("Sending request with token:", token);
      }
    } catch (err) {
      console.error("Request Interceptor Failed", err);
    }
    //TODO add token

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
      } else if ([401, 500].includes(err.response.status)) {
        if (err.response.data?.message === "jwt expired") {
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
