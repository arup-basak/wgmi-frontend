const baseURL = process.env.NEXT_PUBLIC_SERVER_URL as string;

const networkRequest = async <T>(
  url: string,
  method: "GET" | "POST",
  body?: any
): Promise<T | null> => {
  try {
    const response = await fetch(`${baseURL}${url}`, {
      method: method,
      body: method === "POST" ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      console.error("Error Network Request");
      return null;
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default networkRequest;