import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isProduction } from "./Mixpanel";
import ReactGA from "react-ga";

const useGaTracker = () => {
  const router = useRouter();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (isProduction) {
      ReactGA.initialize("UA-179419220-5");
      setInitialized(true);
    } else {
      ReactGA.initialize("UA-179419220-6");
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (initialized) {
      ReactGA.pageview(router.pathname);
    }
  }, [initialized, router.pathname]);
};

export default useGaTracker;
