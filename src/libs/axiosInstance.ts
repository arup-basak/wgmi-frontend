import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL as string;

export const instance = axios.create({
  baseURL: baseURL,
  timeout: 1000,
  headers: {
    Accept: "application/json",
  },
});
