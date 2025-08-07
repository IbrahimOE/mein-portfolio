import ReactGA from "react-ga4";

const TRACKING_ID = "G-6FZ95MW3ZC"; // Deine GA4-ID

export const initGA = () => {
  ReactGA.initialize(TRACKING_ID, {
    gaOptions: {
      anonymizeIp: true,
    },
  });
};

export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};
