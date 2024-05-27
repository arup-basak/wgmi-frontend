import { instance } from "./axiosInstance";

const networkRequest = async <T>(
  url: string,
  method: "GET" | "POST",
  body?: any
) => {
  try {
    const resp = await instance({
      url,
      method,
      data: body,
    });

    if (resp) {
      return resp.data as T;
    } else {
      console.error("Error Network Request");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default networkRequest;
