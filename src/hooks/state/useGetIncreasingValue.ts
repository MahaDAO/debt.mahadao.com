import { useCallback, useEffect, useState } from "react";
import { setInterval } from "timers";

const useGetIncreasingValue = (
  value: string,
  IncreasingRate: number,
  intervalRate: number
) => {
  const [data, setData] = useState<string>(value);

  const fetchValue = useCallback(async () => {
    setData((data) => String(Number(data) + IncreasingRate));
  }, []);

  useEffect(() => {
    let interval: any;
    if (Number(value) && Number(value) > 0 && IncreasingRate > 0) {
      interval = setInterval(() => {
        fetchValue().catch((err) => {
          console.error("Failed to fetch rates", err);
        });
      }, intervalRate);
    }
    return () => clearInterval(interval);
  }, [value, data, IncreasingRate]);

  useEffect(() => {
    setData(value);
  }, [value, IncreasingRate]);

  return data;
};

export default useGetIncreasingValue;
