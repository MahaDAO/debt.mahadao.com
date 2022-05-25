import { useCallback, useEffect, useState } from 'react';

import { BasicStateString } from "../../utils/interface";
import { LOADING_DEFAULT_BASIC_STATE_STRING, NON_LOADING_DEFAULT_BASIC_STATE_STRING } from "../../utils/constants";
import callApi from "../../utils/apiCaller";

const useGetMAHAStakingApy = () => {
  const [data, setData] = useState<BasicStateString>(LOADING_DEFAULT_BASIC_STATE_STRING);

  const fetchValue = useCallback(async () => {
    callApi("apy/mahax")
      .then((res) => {
        try {
          if (res.mahaxApy === null) {
            setData(NON_LOADING_DEFAULT_BASIC_STATE_STRING);
          } else {
            setData({
              isLoading: false,
              value: res.mahaxApy.toString(),
            });
          }
        }
        catch (e) {
          console.error(`Failed to fetch MAHA staking APR: ${e}`);
          setData(NON_LOADING_DEFAULT_BASIC_STATE_STRING);
        }
      })
      .catch((err) => {
        console.error(`Failed to fetch MAHA staking APR: ${err}`);
        setData(NON_LOADING_DEFAULT_BASIC_STATE_STRING);
      })
  }, []);

  useEffect(() => {
    fetchValue().catch((err) => {
      setData(NON_LOADING_DEFAULT_BASIC_STATE_STRING);
      console.error(`Failed to fetch MAHA staking APR: ${err.stack}`)
    });
  }, [fetchValue]);

  return data;
};

export default useGetMAHAStakingApy;
