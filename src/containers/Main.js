import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Header from "../components/header/Header";
import ContactAnimation from "./contactAnimation/ContactAnimation";
import Greeting from "./greeting/Greeting";
import Skills from "./skills/Skills";
import { initGA, logPageView } from "../utils/analytics";
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
import { splashScreen } from "../portfolio";
import { StyleProvider } from "../contexts/StyleContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

import "./Main.scss";

Modal.setAppElement('#root'); // Accessibility: anpassen, falls root anders heißt

const Main = () => {
  const darkPref = window.matchMedia("(prefers-color-scheme: dark)");
  const [isDark, setIsDark] = useLocalStorage("isDark", darkPref.matches);
  const [isShowingSplashAnimation, setIsShowingSplashAnimation] = useState(true);

  // Cookie Consent
  const [showCookieModal, setShowCookieModal] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);

  // Splashscreen Timer
  useEffect(() => {
    if (splashScreen.enabled) {
      const splashTimer = setTimeout(() => setIsShowingSplashAnimation(false), splashScreen.duration);
      return () => clearTimeout(splashTimer);
    }
  }, []);

  // Prüfen ob Consent schon gesetzt wurde
  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (consent === "true") {
      setHasConsented(true);
      initGA();
      logPageView();
    } else {
      setShowCookieModal(true);
    }
  }, []);

  // Consent Entscheidung verarbeiten
  const acceptCookies = () => {
    setHasConsented(true);
    localStorage.setItem("cookieConsent", "true");
    initGA();
    logPageView();
    setShowCookieModal(false);
  };

  const declineCookies = () => {
    setHasConsented(false);
    localStorage.setItem("cookieConsent", "false");
    // Optional: hier kannst du GA-Cookies löschen, falls du das möchtest
    setShowCookieModal(false);
  };

  const changeTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={isDark ? "dark-mode" : null}>
      <StyleProvider value={{ isDark, changeTheme }}>
        {isShowingSplashAnimation && splashScreen.enabled ? (
          <SplashScreen />
        ) : (
          <>
            <Header />
            <Greeting />
            <ContactAnimation />
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
              shouldCloseOnOverlayClick={false}
              shouldCloseOnEsc={false}
              style={{
                overlay: {
                  backgroundColor: "rgba(22,30,42,0.85)",
                  zIndex: 10000,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
                content: {
                  position: "relative",
                  inset: "auto",
                  padding: "30px",
                  borderRadius: "24px",
                  maxWidth: "500px",
                  width: "90%",
                  backgroundColor: "#232b3a",
                  color: "white",
                  boxShadow: "0 4px 50px #06e6a05c",
                },
              }}
            >
              <h2>Cookie-Einstellungen</h2>
              <p>
                Diese Website verwendet Cookies für Analyse und Marketing. Bitte stimme der Nutzung zu oder lehne ab.
              </p>
              <div style={{ marginTop: 20, textAlign: "right" }}>
                <button
                  onClick={declineCookies}
                  style={{
                    backgroundColor: "#ef4444",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "12px",
                    fontWeight: "600",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  Ablehnen
                </button>
                <button
                  onClick={acceptCookies}
                  style={{
                    background: "linear-gradient(90deg, #06e6a0, #1fffd4)",
                    color: "#111827",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "12px",
                    fontWeight: "700",
                    cursor: "pointer",
                    boxShadow: "0 0 10px #06e6a0",
                  }}
                >
                  Akzeptieren
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
