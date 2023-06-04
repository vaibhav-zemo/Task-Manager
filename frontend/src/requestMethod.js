import axios from "axios";

const BASE_URL = "https://task-manager-s3rh.onrender.com";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
