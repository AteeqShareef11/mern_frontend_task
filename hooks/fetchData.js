import { useState, useEffect } from "react";

const useFetchData = (fetchFunction) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetchFunction();
        console.log("res", res);
        const fetchedData = res?.data?.data;
        setData(fetchedData || []);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction]);

  return { data, loading };
};

export default useFetchData;
