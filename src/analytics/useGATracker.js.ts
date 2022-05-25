import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga";
import { isProduction } from './Mixpanel';

const useGaTracker = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (isProduction) {
      ReactGA.initialize("");
      setInitialized(true);
    } else {
      ReactGA.initialize("");
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
