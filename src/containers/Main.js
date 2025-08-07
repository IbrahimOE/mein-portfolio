import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Header from "../components/header/Header";
import ContactAnimation from "./contactAnimation/ContactAnimation";
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
import { splashScreen } from "../portfolio";
import { StyleProvider } from "../contexts/StyleContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

import "./Main.scss";

// Setze das App-Element für Modal (wichtig für Accessibility)
Modal.setAppElement("#root");

const Main = () => {
  const darkPref = window.matchMedia("(prefers-color-scheme: dark)");
  const [isDark, setIsDark] = useLocalStorage("isDark", darkPref.matches);
  const [isShowingSplashAnimation, setIsShowingSplashAnimation] = useState(true);
  const [cookieConsent, setCookieConsent] = useLocalStorage("cookieConsent", null);

  useEffect(() => {
    if (splashScreen.enabled) {
      const timer = setTimeout(() => setIsShowingSplashAnimation(false), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const changeTheme = () => {
    setIsDark(!isDark);
  };

  const acceptCookies = () => setCookieConsent(true);
  const declineCookies = () => setCookieConsent(false);

  return (
    <div className={isDark ? "dark-mode" : ""}>
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
              isOpen={cookieConsent === null}
              onRequestClose={() => {}}
              contentLabel="Cookie Consent"
              style={{
                content: {
                  top: "50%",
                  left: "50%",
                  right: "auto",
                  bottom: "auto",
                  marginRight: "-50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "#232b3a",
                  color: "#fff",
                  borderRadius: "12px",
                  padding: "30px",
                  maxWidth: "400px",
                  boxShadow: "0 4px 50px #06e6a05c",
                  textAlign: "center",
                  zIndex: 10001,
                },
                overlay: {
                  backgroundColor: "rgba(0,0,0,0.7)",
                  zIndex: 10000,
                },
              }}
            >
              <h2>Cookies & Datenschutz</h2>
              <p>
                Diese Website verwendet Cookies für Analyse und Marketing. Bitte stimme der Nutzung zu oder lehne sie ab.
              </p>
              <div style={{ marginTop: "20px" }}>
                <button
                  onClick={acceptCookies}
                  style={{
                    background: "linear-gradient(90deg, #06e6a0, #1fffd4)",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "30px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    marginRight: "10px",
                    color: "#111827",
                  }}
                >
                  Zustimmen
                </button>
                <button
                  onClick={declineCookies}
                  style={{
                    background: "#ef4444",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "30px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    color: "#fff",
                  }}
                >
                  Ablehnen
                </button>
              </div>
              <p style={{ marginTop: "15px", fontSize: "0.9rem", color: "#bbb" }}>
                Mehr Infos in der{" "}
                <a href="/datenschutz" style={{ color: "#06e6a0", textDecoration: "underline" }}>
                  Datenschutzerklärung
                </a>.
              </p>
            </Modal>
          </>
        )}
      </StyleProvider>
    </div>
  );
};

export default Main;
