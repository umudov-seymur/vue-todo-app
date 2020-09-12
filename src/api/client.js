import Axios from "axios";

const token = localStorage.getItem("access_token");
if (token) {
  Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

const client = Axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
