/*eslint-disable */
import { useState } from "react";
import axios from "axios";

interface PostDataParams {
  url: string;
  body: any;
  action?: string;
}

const usePostData = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const handler = async ({ url, body, action }: PostDataParams) => {
    const token = localStorage.getItem("token");
    setLoading(true);
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    try {
      const response = await axios.post(url, body, {
        headers,
      });
      setData(response.data);
      if (action === "login" && response.data) {
        localStorage.setItem("token", response.data?.data.token);
        const user = {
          id: response.data?.data.id,
          full_name: response.data?.data.full_name,
          email: response.data?.data.email,
          points: response.data?.data.points,
        };
        localStorage.setItem("user", JSON.stringify(user));
      }
      setError(null);
    } catch (err: any) {
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, handler };
};

export default usePostData;
