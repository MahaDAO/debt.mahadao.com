import { useCallback, useEffect, useState } from "react";

import { BasicStateString } from "../../utils/interface";
import {
  LOADING_DEFAULT_BASIC_STATE_STRING,
  NON_LOADING_DEFAULT_BASIC_STATE_STRING,
} from "../../utils/constants";
import callApi from "../../utils/apiCaller";

type MAHAXStakingAPYDistribution = {
  usdcValue: BasicStateString;
  mahaValue: BasicStateString;
  sclpValue: BasicStateString;
  arthValue: BasicStateString;
  forwardValue: BasicStateString;
  overallValue: BasicStateString;
};

const MAHAXStakingAPYDistributionLoading: MAHAXStakingAPYDistribution = {
  usdcValue: LOADING_DEFAULT_BASIC_STATE_STRING,
  mahaValue: LOADING_DEFAULT_BASIC_STATE_STRING,
  sclpValue: LOADING_DEFAULT_BASIC_STATE_STRING,
  arthValue: LOADING_DEFAULT_BASIC_STATE_STRING,
  forwardValue: LOADING_DEFAULT_BASIC_STATE_STRING,
  overallValue: LOADING_DEFAULT_BASIC_STATE_STRING,
};

const MAHAXStakingAPYDistributionNonLoading: MAHAXStakingAPYDistribution = {
  usdcValue: NON_LOADING_DEFAULT_BASIC_STATE_STRING,
  mahaValue: NON_LOADING_DEFAULT_BASIC_STATE_STRING,
  sclpValue: NON_LOADING_DEFAULT_BASIC_STATE_STRING,
  arthValue: NON_LOADING_DEFAULT_BASIC_STATE_STRING,
  forwardValue: NON_LOADING_DEFAULT_BASIC_STATE_STRING,
  overallValue: NON_LOADING_DEFAULT_BASIC_STATE_STRING,
};

const useGetMAHAXApyDistribution = () => {
  const [data, setData] = useState<MAHAXStakingAPYDistribution>(
    MAHAXStakingAPYDistributionLoading
  );

  const fetchValue = useCallback(async () => {
    callApi("apy/governance")
      .then((rewardApy) => {
        try {
          console.log("Result", rewardApy);
          setData({
            usdcValue: {
              isLoading: false,
              value: rewardApy.usdcAPY ? rewardApy.usdcAPY.toString() : "",
            },
            mahaValue: {
              isLoading: false,
              value: rewardApy.mahaAPY ? rewardApy.mahaAPY.toString() : "",
            },
            sclpValue: {
              isLoading: false,
              value: rewardApy.sclpAPY ? rewardApy.sclpAPY.toString() : "",
            },
            arthValue: {
              isLoading: false,
              value: rewardApy.arthAPY ? rewardApy.arthAPY.toString() : "",
            },
            forwardValue: {
              isLoading: false,
              value: rewardApy.forwardAPY
                ? rewardApy.forwardAPY.toString()
                : "",
            },
            overallValue: {
              isLoading: false,
              value: rewardApy.overallAPY
                ? rewardApy.overallAPY.toString()
                : "",
            },
          });
        } catch (e) {
          console.error(`Failed to fetch MAHAX APR distribution: ${e}`);
          setData(MAHAXStakingAPYDistributionNonLoading);
        }
      })
      .catch((err) => {
        console.error(`Failed to fetch MAHAX APR distribution: ${err}`);
        setData(MAHAXStakingAPYDistributionNonLoading);
      });
  }, []);

  useEffect(() => {
    fetchValue().catch((err) => {
      setData(MAHAXStakingAPYDistributionNonLoading);
      console.error(`Failed to fetch MAHAX APR distribution: ${err.stack}`);
    });
  }, [fetchValue]);

  return data;
};

export default useGetMAHAXApyDistribution;
