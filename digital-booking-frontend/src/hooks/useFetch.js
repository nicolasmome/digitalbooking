import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url) => {
    setLoading(true);

    try {
      const resp = await fetch(url);
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      const data = await resp.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData(url);
  }, [url]);

  return {
    data,
    loading,
    error
  }
};


export default useFetch;