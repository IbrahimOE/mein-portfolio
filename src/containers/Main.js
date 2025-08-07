import React, { useEffect, useState } from "react";
import CookieConsent from "react-cookie-consent";
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

const Main = () => {
  const darkPref = window.matchMedia("(prefers-color-scheme: dark)");
  const [isDark, setIsDark] = useLocalStorage("isDark", darkPref.matches);
  const [isShowingSplashAnimation, setIsShowingSplashAnimation] = useState(true);
  const [hasConsented, setHasConsented] = useState(false);

  // Splashscreen Timer
  useEffect(() => {
    if (splashScreen.enabled) {
      const splashTimer = setTimeout(
        () => setIsShowingSplashAnimation(false),
        splashScreen.duration
      );
      return () => clearTimeout(splashTimer);
    }
  }, []);

  // Consent aus localStorage lesen beim Laden der Seite
  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (consent === "true") {
      setHasConsented(true);
      initGA();
      logPageView();
    }
  }, []);

  // Wenn Consent geändert wird: GA starten oder deaktivieren
  useEffect(() => {
    if (hasConsented) {
      initGA();
      logPageView();
      localStorage.setItem("cookieConsent", "true");
      // GA Tracking erlauben
      window["ga-disable-UA-XXXXXX-Y"] = false; // Ersetze UA-XXXXXX-Y mit deiner GA-ID
    } else {
      localStorage.setItem("cookieConsent", "false");
      // GA Tracking deaktivieren
      window["ga-disable-UA-XXXXXX-Y"] = true;
      // Optional: GA-Cookies löschen
      // document.cookie = "_ga=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  }, [hasConsented]);

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

            {/* Cookie Consent */}
            <CookieConsent
              location="bottom"
              buttonText="Ich akzeptiere"
              declineButtonText="Ablehnen"
              enableDeclineButton
              onAccept={() => setHasConsented(true)}
              onDecline={() => setHasConsented(false)}
              cookieName="cookieConsent"
              style={{
                background: "#111827",
                padding: "20px 30px",
                fontSize: "1rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                borderRadius: "10px 10px 0 0",
                animation: "slideUp 0.5s ease forwards",
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 9999,
              }}
              buttonStyle={{
                background: "linear-gradient(90deg, #06e6a0, #1fffd4)",
                color: "#111827",
                fontWeight: "700",
                borderRadius: "30px",
                padding: "10px 24px",
                fontSize: "1rem",
                boxShadow: "0 0 10px #06e6a0",
                cursor: "pointer",
                marginLeft: "12px",
              }}
              declineButtonStyle={{
                background: "#ef4444",
                color: "#fff",
                fontWeight: "700",
                borderRadius: "30px",
                padding: "10px 24px",
                fontSize: "1rem",
                cursor: "pointer",
              }}
              expires={150}
            >
              Diese Website nutzt Cookies für Analyse & Marketing. Mehr Infos in der{" "}
              <a
                href="/datenschutz"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#06e6a0", textDecoration: "underline" }}
              >
                Datenschutzerklärung
              </a>.
            </CookieConsent>
          </>
        )}
      </StyleProvider>
    </div>
  );
};

export default Main;
