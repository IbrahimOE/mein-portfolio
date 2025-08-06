import React, { useContext } from "react";
import "./Contact.scss";
import { Fade } from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function Contact() {
  const { isDark } = useContext(StyleContext);

  return (
    <Fade bottom duration={900} distance="20px">
      <section className="contact-section" id="contact">
        <form
          action="https://formspree.io/f/xyzpbgpg"
          method="POST"
          className={`contact-form-new${isDark ? " dark" : ""}`}
          autoComplete="off"
        >
          <h2 className="contact-title">Kontakt aufnehmen</h2>
          <div className="contact-fields">
            <div className="contact-field">
              <input type="text" name="name" id="name" required placeholder=" " />
              <label htmlFor="name">Name *</label>
            </div>
            <div className="contact-field">
              <input type="email" name="email" id="email" required placeholder=" " />
              <label htmlFor="email">E-Mail *</label>
            </div>
            <div className="contact-field">
              <input type="text" name="phone" id="phone" placeholder=" " />
              <label htmlFor="phone">Telefon</label>
            </div>
            <div className="contact-field">
              <input type="text" name="company" id="company" placeholder=" " />
              <label htmlFor="company">Unternehmen</label>
            </div>
            <div className="contact-field">
              <input type="text" name="linkedin" id="linkedin" placeholder=" " />
              <label htmlFor="linkedin">LinkedIn (optional)</label>
            </div>
            <div className="contact-field">
              <input type="text" name="subject" id="subject" required placeholder=" " />
              <label htmlFor="subject">Betreff *</label>
            </div>
            <div className="contact-field full">
              <textarea name="message" id="message" required rows={6} placeholder=" "></textarea>
              <label htmlFor="message">Nachricht *</label>
            </div>
          </div>
          <button type="submit" className="contact-submit-btn">Absenden</button>
        </form>
      </section>
    </Fade>
  );
}
