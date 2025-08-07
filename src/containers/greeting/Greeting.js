import React, { useContext, useState, useEffect } from "react";
import { Fade } from "react-reveal";
import emoji from "react-easy-emoji";
import "./Greeting.scss";
import landingPerson from "../../assets/lottie/landingPerson";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import Button from "../../components/button/Button";
import { illustration, greeting } from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

export default function Greeting() {
  const { isDark } = useContext(StyleContext);

  // --- Typing Animation ---
  const text = greeting.title || "Hi, ich bin Ibrahim 👋";
  const typeSpeed = 70;
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, typeSpeed);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  if (!greeting.displayGreeting) return null;

  return (
    <Fade bottom duration={1000} distance="40px">
      <div className="greet-main" id="greeting">
        <div className="greeting-main">
          <div className="greeting-text-div">
            <div>
              {/* Dezenter Neon-Typing */}
              <div
                style={{
                  position: "relative",
                  padding: "16px 24px",
                  borderRadius: "16px",
                  marginBottom: "26px",
                  background: isDark
                    ? "linear-gradient(120deg, #15171e 70%, #059677 100%)"
                    : "linear-gradient(120deg, #e8fcf6 0%, #abf6e2 60%, #f9f9f9 100%)",
                  boxShadow: isDark
                    ? "0 0 16px 2px #05967755, 0 0 32px 4px #1fffd455"
                    : "0 0 8px 1px #abf6e255",
                  animation: "neonBGGlow 2.2s ease-in-out infinite alternate",
                  display: "inline-block",
                  zIndex: 2,
                }}
              >
                <h1
                  className={isDark ? "dark-mode greeting-text" : "greeting-text"}
                  style={{
                    fontFamily: "'Fira Mono', monospace",
                    fontWeight: 700,
                    color: isDark ? "#dbfffa" : "#059677",
                    fontSize: "2.1rem",
                    letterSpacing: ".01em",
                    margin: 0,
                    textShadow: isDark
                      ? `
                        0 0 3px #1fffd4,
                        0 0 8px #059677
                      `
                      : `
                        0 0 1.5px #abf6e2,
                        0 0 3px #059677
                      `,
                    zIndex: 10,
                    position: "relative",
                  }}
                >
                  {displayed}
                  <span
                    className="typing-cursor"
                    style={{
                      fontWeight: 700,
                      color: "#1fffd4",
                      marginLeft: "1px",
                      filter: "drop-shadow(0 0 2px #1fffd4)",
                      animation: "blink 1s step-end infinite",
                    }}
                  >
                    |
                  </span>
                </h1>
                {/* Dezente Neonlinie */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "6px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "44%",
                    height: "2px",
                    borderRadius: "1px",
                    background: isDark
                      ? "linear-gradient(90deg, #059677 0%, #1fffd4 100%)"
                      : "linear-gradient(90deg, #abf6e2 0%, #059677 100%)",
                    filter: "blur(0.5px)",
                    opacity: 0.42,
                    animation: "neonLineGlow 2s infinite alternate",
                  }}
                />
              </div>
              <style>{`
                @keyframes blink {
                  0%, 100% { opacity: 1 }
                  50% { opacity: 0 }
                }
                @keyframes neonBGGlow {
                  0% {
                    box-shadow: 0 0 16px 2px #05967755, 0 0 32px 4px #1fffd455;
                  }
                  100% {
                    box-shadow: 0 0 24px 6px #1fffd433, 0 0 40px 8px #05967733;
                  }
                }
                @keyframes neonLineGlow {
                  0% {
                    opacity: 0.38;
                    filter: blur(0.5px);
                  }
                  100% {
                    opacity: 0.54;
                    filter: blur(1.2px);
                  }
                }
              `}</style>

              <p
                className={
                  isDark
                    ? "dark-mode greeting-text-p"
                    : "greeting-text-p subTitle"
                }
              >
                {greeting.subTitle}
              </p>
              <div id="resume" className="empty-div"></div>
              <SocialMedia />
              <div className="button-greeting-div">
                <Button text="Contact me" href="#contact" />
                {greeting.resumeLink && (
                  <a
                    href={require("./resume.pdf")}
                    download="Resume.pdf"
                    className="download-link-button"
                  >
                    <Button text="Download my resume" />
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="greeting-image-div">
            {illustration.animated ? (
              <DisplayLottie animationData={landingPerson} />
            ) : (
              <img
                alt="man sitting on table"
                src={require("../../assets/images/manOnTable.svg")}
              />
            )}
          </div>
        </div>
      </div>
    </Fade>
  );
}
