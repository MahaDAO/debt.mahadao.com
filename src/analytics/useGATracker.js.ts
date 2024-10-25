import { useEffect, useState } from "react";
import { isProduction } from "./Mixpanel";
import ReactGA from "react-ga";
import { usePathname } from "next/navigation";

const useGaTracker = () => {
  const pathname = usePathname();
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
      ReactGA.pageview(pathname);
    }
  }, [initialized, pathname]);
};

export default useGaTracker;
