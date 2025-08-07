import React, { useContext, useState, useEffect } from "react";
import "./SplashScreen.css";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import { greeting, splashScreen } from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";
import { motion } from "framer-motion";


export default function SplashScreen() {
  const { isDark } = useContext(StyleContext);

  const [displayText, setDisplayText] = useState("");
  const fullText = "Wilkommen";
  const speed = 300; // Tipper-Effekt 600ms pro Buchstabe

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) => {
        if (index === fullText.length) {
          index = 0;
          return "";
        } else {
          return prev + fullText.charAt(index++);
        }
      });
    }, speed);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={isDark ? "dark-mode splash-container" : "splash-container"}>
      <div className="splash-animation-container">
        <DisplayLottie animationData={splashScreen.animation} />
      </div>

      <div className="splash-title-container">
        <span className="grey-color"> &lt;</span>
        <span className="splash-title">{greeting.username}</span>
        <span className="grey-color">/&gt;</span>
      </div>

      <div className="welcome-animation">
        {displayText}
        <span className="cursor">|</span>
      </div>

      <div className="loading-container">
        <div className="loading-spinner"></div>
        <span className="loading-text">Seite wird geladen...</span>
      </div>

      <style>{`
        .welcome-animation {
          margin-top: 2rem;
          color: #06e6a0;
          font-family: 'Courier New', Courier, monospace;
          font-size: 2rem;
          user-select: none;
          text-align: center;
          text-shadow:
            0 0 5px #06e6a0,
            0 0 10px #06e6a0,
            0 0 20px #1fffd4,
            0 0 30px #1fffd4,
            0 0 40px #06e6a0;
        }

        .cursor {
          font-weight: 900;
          animation: blinkNeon 1s step-start 0s infinite;
          color: #06e6a0;
          text-shadow:
            0 0 5px #06e6a0,
            0 0 10px #06e6a0,
            0 0 20px #1fffd4,
            0 0 30px #1fffd4,
            0 0 40px #06e6a0;
        }

        @keyframes blinkNeon {
          0%, 100% { opacity: 1; color: #06e6a0; text-shadow:
            0 0 5px #06e6a0,
            0 0 10px #06e6a0,
            0 0 20px #1fffd4,
            0 0 30px #1fffd4,
            0 0 40px #06e6a0;}
          50% { opacity: 0; color: #00fff7; text-shadow: none; }
        }

        .loading-container {
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .loading-spinner {
          border: 5px solid rgba(6, 230, 160, 0.15);
          border-top: 5px solid #06e6a0;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spinPulse 1.5s linear infinite;
          box-shadow:
            0 0 10px #06e6a0,
            0 0 20px #1fffd4,
            0 0 40px #06e6a0;
        }

        @keyframes spinPulse {
          0% { transform: rotate(0deg) scale(1); box-shadow:
            0 0 10px #06e6a0,
            0 0 20px #1fffd4,
            0 0 40px #06e6a0; }
          50% { transform: rotate(180deg) scale(1.15); box-shadow:
            0 0 20px #00fff7,
            0 0 30px #1fffd4,
            0 0 50px #06e6a0;}
          100% { transform: rotate(360deg) scale(1); box-shadow:
            0 0 10px #06e6a0,
            0 0 20px #1fffd4,
            0 0 40px #06e6a0;}
        }

        .loading-text {
          margin-top: 12px;
          color: #06e6a0;
          font-size: 1.2rem;
          font-family: Arial, sans-serif;
          text-shadow:
            0 0 5px #06e6a0,
            0 0 10px #1fffd4;
          user-select: none;
        }
      `}</style>
    </div>
  );
<div className="splash-animation-container">
  <motion.div
    initial={{ scale: 1 }}
    animate={{ scale: [1, 1.06, 1] }}
    transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
  >
    <DisplayLottie animationData={splashScreen.animation} />
  </motion.div>
</div>



}
