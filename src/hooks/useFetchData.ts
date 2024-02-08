import { useState } from "react";
import axios from "axios";

const useFetchData = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const handler = async (url: string) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
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

export default useFetchData;
