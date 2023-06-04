import axios from "axios";

const BASE_URL = "https://task-manager-s3rh.onrender.com";
// const BASE_URL = "http://localhost:5000";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
