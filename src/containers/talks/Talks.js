import React, { useContext } from "react";
import "./Talks.scss";
import { talkSection } from "../../portfolio";
import { Fade } from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function Talks() {
  const { isDark } = useContext(StyleContext);
  if (!talkSection.display) {
    return null;
  }
  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="talks">
        <div className="talk-header">
          <h1 className="talk-header-title">{talkSection.title}</h1>
          <p
            className={
              isDark
                ? "dark-mode talk-header-subtitle"
                : "subTitle talk-header-subtitle"
            }
          >
            {talkSection.subtitle}
          </p>
          {/* Hier das GIF statt Mapping */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={require("../../assets/images/matrix.gif")}
              alt="Hacker Animation"
              style={{
                width: "100%",
                maxWidth: "500px",
                borderRadius: "12px",
                marginTop: "24px"
              }}
            />
          </div>
        </div>
      </div>
    </Fade>
  );
}
