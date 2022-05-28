import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga";
import { isProduction } from './Mixpanel';

const useGaTracker = () => {
  const location = useLocation();
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
      ReactGA.pageview(location.pathname);
    }
  }, [initialized, location]);
};

export default useGaTracker;
