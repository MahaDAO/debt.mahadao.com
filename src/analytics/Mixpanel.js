import mixpanel from 'mixpanel-browser';

export const isProduction = process.env.REACT_APP_NETWORK === "matic";

if (isProduction) {
  mixpanel.init("");
} else {
  mixpanel.init("");
}

let env_check = true;

let actions = {
  identify: (id) => {
    if (env_check) {
      mixpanel.identify(id);
    }
  },
  alias: (id) => {
    if (env_check) mixpanel.alias(id);
  },
  track: (name, props) => {
    if (env_check) {
      mixpanel.track(name, props);
    }
  },
  people: {
    set: (props) => {
      if (env_check) mixpanel.people.set(props);
    },
  },
};

export let Mixpanel = actions;
