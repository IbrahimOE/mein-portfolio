import React, { useContext, useState } from "react";
import Headroom from "react-headroom";
import Modal from "react-modal";
import "./Header.scss";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import StyleContext from "../../contexts/StyleContext";
import {
  greeting,
  workExperiences,
  skillsSection,
  openSource,
  blogSection,
  talkSection,
  achievementSection,
  resumeSection
} from "../../portfolio";

function Header() {
  const { isDark } = useContext(StyleContext);
  const [showLogin, setShowLogin] = useState(false);

  const viewExperience = workExperiences.display;
  const viewOpenSource = openSource.display;
  const viewSkills = skillsSection.display;
  const viewAchievement = achievementSection.display;
  const viewBlog = blogSection.display;
  const viewTalks = talkSection.display;
  const viewResume = resumeSection.display;

  return (
    <>
      <Headroom>
        <header className={isDark ? "dark-menu header" : "header"}>
          <a href="/" className="logo">
            <span className="grey-color"> &lt;</span>
            <span className="logo-name">{greeting.username}</span>
            <span className="grey-color">/&gt;</span>
          </a>
          <input className="menu-btn" type="checkbox" id="menu-btn" />
          <label
            className="menu-icon"
            htmlFor="menu-btn"
            style={{ color: "white" }}
          >
            <span className={isDark ? "navicon navicon-dark" : "navicon"}></span>
          </label>
          <ul className={isDark ? "dark-menu menu" : "menu"}>
            <li>
              <a
                className="navbar-login-btn"
                href="#"
                onClick={e => { e.preventDefault(); setShowLogin(true); }}
              >
                Login
              </a>
            </li>
            {viewSkills && (
              <li>
                <a href="#skills">Skills</a>
              </li>
            )}
            {viewExperience && (
              <li>
                <a href="#experience">Work Experiences</a>
              </li>
            )}
            {viewOpenSource && (
              <li>
                <a href="#opensource">Open Source</a>
              </li>
            )}
            {viewAchievement && (
              <li>
                <a href="#achievements">Achievements</a>
              </li>
            )}
            {viewBlog && (
              <li>
                <a href="#blogs">Blogs</a>
              </li>
            )}
            {viewTalks && (
              <li>
                <a href="#talks">Talks</a>
              </li>
            )}
            {viewResume && (
              <li>
                <a href="#resume">Resume</a>
              </li>
            )}
            <li>
              <a href="#contact">Contact Me</a>
            </li>
            <li>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>
                <ToggleSwitch />
              </a>
            </li>
          </ul>
        </header>
      </Headroom>

      {/* MODAL-LOGIN-OVERLAY */}
      <Modal
        isOpen={showLogin}
        onRequestClose={() => setShowLogin(false)}
        className="login-modal"
        overlayClassName="login-modal-overlay"
        ariaHideApp={false}
      >
        <h2
          style={{
            color: "#06e6a0",
            fontWeight: "900",
            letterSpacing: ".04em",
            textAlign: "center",
            marginBottom: "20px"
          }}
        >
          Login
        </h2>
        <form
          className="login-form"
          autoComplete="off"
          onSubmit={e => {
            e.preventDefault();
            alert("Login coming soon!");
          }}
        >
          <label>
            Benutzername
            <input type="text" placeholder="Benutzername" autoFocus />
          </label>
          <label>
            Passwort
            <input type="password" placeholder="Passwort" />
          </label>
          <button type="submit" className="login-btn">
            Einloggen
          </button>
        </form>
        <button
          onClick={() => setShowLogin(false)}
          className="close-modal-btn"
        >
          Schließen
        </button>
      </Modal>
    </>
  );
}
export default Header;
