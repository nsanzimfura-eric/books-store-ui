import { useState } from "react";
import axios from "axios";

const useDeleteData = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const handler = async (url: string) => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await axios.delete(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setData(response.data);
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

export default useDeleteData;
