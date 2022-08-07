import axios from "axios";

export const httpV1 = axios.create({
  withCredentials: true,
  baseURL: "/api/v1"
});
