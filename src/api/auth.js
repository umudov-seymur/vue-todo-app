import client from "./client";

export default {
  login: (credentials) => client.post("/login", credentials),
  register: (user) => client.post("/register", user),
  logout: () => client.delete("/logout"),
};
