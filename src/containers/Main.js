import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Greeting from "./greeting/Greeting";
import Skills from "./skills/Skills";
import StackProgress from "./skillProgress/skillProgress";
import WorkExperience from "./workExperience/WorkExperience";
import Projects from "./projects/Projects";
import StartupProject from "./StartupProjects/StartupProject";
import Achievement from "./achievement/Achievement";
import Blogs from "./blogs/Blogs";
import Footer from "../components/footer/Footer";
import Talks from "./talks/Talks";
import Podcast from "./podcast/Podcast";
import Education from "./education/Education";
import ScrollToTopButton from "./topbutton/Top";
import Twitter from "./twitter-embed/twitter";
import Profile from "./profile/Profile";
import SplashScreen from "./splashScreen/SplashScreen";
import Modal from "react-modal";
import { initGA, logPageView } from "../utils/analytics";
import { splashScreen } from "../portfolio";
import { StyleProvider } from "../contexts/StyleContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

import "./Main.scss";

Modal.setAppElement("#root"); // wichtig für Screenreader

const Main = () => {
  const darkPref = window.matchMedia("(prefers-color-scheme: dark)");
  const [isDark, setIsDark] = useLocalStorage("isDark", darkPref.matches);
  const [isShowingSplashAnimation, setIsShowingSplashAnimation] = useState(true);

  // Cookie Consent
  const [cookieConsent, setCookieConsent] = useState(
    localStorage.getItem("cookieConsent") === "true"
  );
  const [showCookieModal, setShowCookieModal] = useState(!cookieConsent);

  useEffect(() => {
    if (splashScreen.enabled) {
      const timer = setTimeout(() => setIsShowingSplashAnimation(false), splashScreen.duration);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (cookieConsent) {
      initGA();
      logPageView();
      localStorage.setItem("cookieConsent", "true");
      setShowCookieModal(false);
    } else {
      localStorage.setItem("cookieConsent", "false");
      // Optional: GA deaktivieren, Cookies löschen falls möglich
    }
  }, [cookieConsent]);

  const changeTheme = () => setIsDark(!isDark);

  const acceptCookies = () => setCookieConsent(true);
  const declineCookies = () => setCookieConsent(false);

  return (
    <div className={isDark ? "dark-mode" : undefined}>
      <StyleProvider value={{ isDark, changeTheme }}>
        {isShowingSplashAnimation && splashScreen.enabled ? (
          <SplashScreen />
        ) : (
          <>
            <Header />
            <Greeting />
            <Education />
            <Skills />
            <StackProgress />
            <WorkExperience />
            <Projects />
            <StartupProject />
            <Achievement />
            <Blogs />
            <Talks />
            <Twitter />
            <Podcast />
            <Profile />
            <Footer />
            <ScrollToTopButton />

            {/* Cookie Consent Modal */}
            <Modal
              isOpen={showCookieModal}
              onRequestClose={() => {}}
              style={{
                content: {
                  maxWidth: "500px",
                  margin: "auto",
                  padding: "30px",
                  borderRadius: "12px",
                  backgroundColor: "#232b3a",
                  color: "white",
                  textAlign: "center",
                },
                overlay: {
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  zIndex: 10000,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                },
              }}
              shouldCloseOnOverlayClick={false}
              shouldCloseOnEsc={false}
              ariaHideApp={true}
            >
              <h2>Cookie-Einwilligung</h2>
              <p>
                Unsere Website verwendet Cookies für Analyse und Marketing.
                Bitte akzeptieren Sie, damit wir Ihre Nutzererfahrung verbessern können.
              </p>
              <div style={{ marginTop: "20px" }}>
                <button
                  onClick={acceptCookies}
                  style={{
                    marginRight: "10px",
                    padding: "10px 20px",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: "#06e6a0",
                    color: "#232b3a",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Akzeptieren
                </button>
                <button
                  onClick={declineCookies}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: "#ef4444",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Ablehnen
                </button>
              </div>
            </Modal>
          </>
        )}
      </StyleProvider>
    </div>
  );
};

export default Main;
