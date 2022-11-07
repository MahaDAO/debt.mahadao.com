import { useCallback, useEffect, useState } from 'react';

import { BasicStateString } from "../../utils/interface";
import { LOADING_DEFAULT_BASIC_STATE_STRING, NON_LOADING_DEFAULT_BASIC_STATE_STRING } from "../../utils/constants";

type MAHAXStakingRewardProps = {
  usdcReward: BasicStateString;
  mahaReward: BasicStateString;
  sclpReward: BasicStateString;
  arthReward: BasicStateString;
}

const MAHAXStakingRewardLoading: MAHAXStakingRewardProps = {
  usdcReward: LOADING_DEFAULT_BASIC_STATE_STRING,
  mahaReward: LOADING_DEFAULT_BASIC_STATE_STRING,
  sclpReward: LOADING_DEFAULT_BASIC_STATE_STRING,
  arthReward: LOADING_DEFAULT_BASIC_STATE_STRING,
}

const MAHAXStakingRewardNonLoading: MAHAXStakingRewardProps = {
  usdcReward: NON_LOADING_DEFAULT_BASIC_STATE_STRING,
  mahaReward: NON_LOADING_DEFAULT_BASIC_STATE_STRING,
  sclpReward: NON_LOADING_DEFAULT_BASIC_STATE_STRING,
  arthReward: NON_LOADING_DEFAULT_BASIC_STATE_STRING,
}

const useGetDistributedMAHAXRewards = () => {
  const [data, setData] = useState<MAHAXStakingRewardProps>(MAHAXStakingRewardLoading);

  const fetchValue = useCallback(async () => {
    setData({
      usdcReward: NON_LOADING_DEFAULT_BASIC_STATE_STRING,
      mahaReward: {
        isLoading: false,
        value: "200",
      },
      sclpReward: {
        isLoading: false,
        value: "500",
      },
      arthReward: NON_LOADING_DEFAULT_BASIC_STATE_STRING,
    });
  }, []);

  useEffect(() => {
    fetchValue().catch((err) => {
      setData(MAHAXStakingRewardNonLoading);
      console.error(`Failed to fetch Distributed MAHAX rewards: ${err}`)
    });
  }, [fetchValue]);

  return data;
};

export default useGetDistributedMAHAXRewards;
