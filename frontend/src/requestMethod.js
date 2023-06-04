import axios from "axios";

const BASE_URL = "http://task-manager-s3rh.onrender.com";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
