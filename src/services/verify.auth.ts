import http from "./api";
import store from "../store";

export default function verifyToken() {
  http
    .get("/auth/verify-auth")
    .then((response) => {
      if (response.status === 200) {
        store.commit("setAuthenticated", true);
      }
    })
    .catch(() => {
      store.commit("setAuthenticated", false);
    });
}
