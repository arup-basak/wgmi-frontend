import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL as string;

const networkRequest = async <T>(
  url: string,
  method: "GET" | "POST",
  body?: any
): Promise<T | null> => {
  try {
    const response = await axios({
      url: new URL(url, baseURL).href,
      method: method,
      data: method === "POST" ? body : null,
    });

    return response.data as T;
  } catch (error) {
    console.error("Error Network Request:", error);
    return null;
  }
};

export default networkRequest;
