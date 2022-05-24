import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize(`${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`);
};

export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};
