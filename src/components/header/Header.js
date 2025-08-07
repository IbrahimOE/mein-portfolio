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
  resumeSection,
} from "../../portfolio";

function Header() {
  const { isDark } = useContext(StyleContext);

  // Modal-States
  const [showLogin, setShowLogin] = useState(false);
  const [showDatenschutz, setShowDatenschutz] = useState(false);
  const [showImpressum, setShowImpressum] = useState(false);

  // Sichtbarkeits-Flags für Sektionen
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
            <span
              className={isDark ? "navicon navicon-dark" : "navicon"}
            ></span>
          </label>

          <ul className={isDark ? "dark-menu menu" : "menu"}>
            <li>
              <a
                className="navbar-login-btn"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShowLogin(true);
                }}
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

            {/* Trennlinie */}
            <li
              style={{
                borderLeft: "1px solid #ccc",
                marginLeft: "1rem",
                height: "24px",
              }}
            ></li>

            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShowDatenschutz(true);
                }}
              >
                Datenschutz
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShowImpressum(true);
                }}
              >
                Impressum
              </a>
            </li>
          </ul>
        </header>
      </Headroom>

      {/* Login Modal */}
      <Modal
        isOpen={showLogin}
        onRequestClose={() => setShowLogin(false)}
        className="login-modal"
        overlayClassName="login-modal-overlay"
        ariaHideApp={false}
        style={{
          content: {
            width: "400px",
            margin: "auto",
            padding: "30px",
            backgroundColor: "#232b3a",
            color: "white",
            borderRadius: "24px",
            boxShadow: "0 4px 50px #06e6a05c",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          },
          overlay: {
            backgroundColor: "rgba(22,30,42,0.77)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Login</h2>
        <form
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Login coming soon!");
          }}
          style={{ width: "100%" }}
        >
          <label style={{ display: "block", marginBottom: "10px" }}>
            Benutzername
            <input
              type="text"
              placeholder="Benutzername"
              autoFocus
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                borderRadius: "7px",
                border: "none",
                backgroundColor: "#1b2331",
                color: "white",
              }}
            />
          </label>
          <label style={{ display: "block", marginBottom: "20px" }}>
            Passwort
            <input
              type="password"
              placeholder="Passwort"
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                borderRadius: "7px",
                border: "none",
                backgroundColor: "#1b2331",
                color: "white",
              }}
            />
          </label>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "13px 0",
              background: "linear-gradient(90deg, #06e6a0 0%, #1fffd4 100%)",
              border: "none",
              borderRadius: "9px",
              fontWeight: "700",
              fontSize: "1.1rem",
              cursor: "pointer",
              boxShadow: "0 2px 14px #06e6a032",
            }}
          >
            Coming Soon!
          </button>
        </form>
        <button
          onClick={() => setShowLogin(false)}
          style={{
            marginTop: "12px",
            background: "none",
            color: "#19ffe6",
            border: "none",
            fontSize: "1.04rem",
            cursor: "pointer",
            opacity: 0.76,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.76")}
        >
          Schließen
        </button>
      </Modal>

      {/* Datenschutzerklärung Modal */}
      <Modal
  isOpen={showDatenschutz}
  onRequestClose={() => setShowDatenschutz(false)}
  ariaHideApp={false}
  style={{
    content: {
      width: "600px",
      maxHeight: "80vh",
      margin: "auto",
      padding: "30px",
      color: "white",
      overflowY: "auto",
      whiteSpace: "normal",
      wordWrap: "break-word",
      overflowWrap: "break-word",
      borderRadius: "24px",
      backgroundColor: "#232b3a",
      boxShadow: "0 4px 50px #06e6a05c",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    overlay: {
      backgroundColor: "rgba(22,30,42,0.77)",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  }}
  className="login-modal"
  overlayClassName="login-modal-overlay"
>
  <h2 style={{ marginBottom: "20px" }}>Datenschutzerklärung</h2>

  <div style={{ width: "100%", overflowY: "auto" }}>
    <p><strong>1. Datenschutz auf einen Blick</strong></p>
    <p><strong>Allgemeine Hinweise</strong></p>
    <p>
      Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
      Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
      Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
    </p>

    <p><strong>Datenerfassung auf dieser Website</strong></p>
    <p><strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong></p>
    <p>
      Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle“ in dieser Datenschutzerklärung entnehmen.
    </p>

    <p><strong>Wie erfassen wir Ihre Daten?</strong></p>
    <p>
      Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
      Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
      Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
    </p>

    <p><strong>Wofür nutzen wir Ihre Daten?</strong></p>
    <p>
      Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
      Sofern über die Website Verträge geschlossen oder angebahnt werden können, werden die übermittelten Daten auch für Vertragsangebote, Bestellungen oder sonstige Auftragsanfragen verarbeitet.
    </p>

    <p><strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong></p>
    <p>
      Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten.
      Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.
      Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen.
      Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
      Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
    </p>

    <p>
      Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.
    </p>

    <p><strong>2. Hosting</strong></p>
    <p>
      Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
    </p>

    <p><strong>Externes Hosting</strong></p>
    <p>
      Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert.
      Hierbei kann es sich u. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten handeln, die über eine Website generiert werden.
    </p>
    <p>
      Das externe Hosting erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).
      Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) umfasst. Die Einwilligung ist jederzeit widerrufbar.
    </p>
    <p>
      Unser(e) Hoster wird bzw. werden Ihre Daten nur insoweit verarbeiten, wie dies zur Erfüllung seiner Leistungspflichten erforderlich ist und unsere Weisungen in Bezug auf diese Daten befolgen.
    </p>

    <p><strong>3. Allgemeine Hinweise und Pflichtinformationen</strong></p>
    <p><strong>Datenschutz</strong></p>
    <p>
      Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
      Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können.
      Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
      Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
    </p>

    <p><strong>Hinweis zur verantwortlichen Stelle</strong></p>
    <p>
      Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br />
      Ibrahim Öztürk<br />
      65474 Bischofsheim<br />
      E-Mail: i.ozt@gmx.de
    </p>

    <p><strong>Speicherdauer</strong></p>
    <p>
      Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt.
      Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben (z. B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.
    </p>

    <p><strong>Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf dieser Website</strong></p>
    <p>
      Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere Datenkategorien nach Art. 9 Abs. 1 DSGVO verarbeitet werden.
      Im Falle einer ausdrücklichen Einwilligung in die Übertragung personenbezogener Daten in Drittstaaten erfolgt die Datenverarbeitung außerdem auf Grundlage von Art. 49 Abs. 1 lit. a DSGVO.
      Sofern Sie in die Speicherung von Cookies oder in den Zugriff auf Informationen in Ihr Endgerät (z. B. via Device-Fingerprinting) eingewilligt haben, erfolgt die Datenverarbeitung zusätzlich auf Grundlage von § 25 Abs. 1 TDDDG.
      Die Einwilligung ist jederzeit widerrufbar.
      Sind Ihre Daten zur Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, verarbeiten wir Ihre Daten auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO.
      Des Weiteren verarbeiten wir Ihre Daten, sofern diese zur Erfüllung einer rechtlichen Verpflichtung erforderlich sind auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO.
      Die Datenverarbeitung kann ferner auf Grundlage unseres berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO erfolgen.
      Über die jeweils im Einzelfall einschlägigen Rechtsgrundlagen wird in den folgenden Absätzen dieser Datenschutzerklärung informiert.
    </p>

    <p><strong>Empfänger von personenbezogenen Daten</strong></p>
    <p>
      Im Rahmen unserer Geschäftstätigkeit arbeiten wir mit verschiedenen externen Stellen zusammen.
      Dabei ist teilweise auch eine Übermittlung von personenbezogenen Daten an diese externen Stellen erforderlich.
      Wir geben personenbezogene Daten nur dann an externe Stellen weiter, wenn dies im Rahmen einer Vertragserfüllung erforderlich ist,
      wenn wir gesetzlich hierzu verpflichtet sind (z. B. Weitergabe von Daten an Steuerbehörden),
      wenn wir ein berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO an der Weitergabe haben oder wenn eine sonstige Rechtsgrundlage die Datenweitergabe erlaubt.
      Beim Einsatz von Auftragsverarbeitern geben wir personenbezogene Daten unserer Kunden nur auf Grundlage eines gültigen Vertrags über Auftragsverarbeitung weiter.
      Im Falle einer gemeinsamen Verarbeitung wird ein Vertrag über gemeinsame Verarbeitung geschlossen.
    </p>

    <p><strong>Widerruf Ihrer Einwilligung zur Datenverarbeitung</strong></p>
    <p>
      Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich.
      Sie können eine bereits erteilte Einwilligung jederzeit widerrufen.
      Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
    </p>

    <p><strong>Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)</strong></p>
    <p>
      Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt,
      haben Sie jederzeit das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben,
      gegen die Verarbeitung Ihrer personenbezogenen Daten Widerspruch einzulegen;
      dies gilt auch für ein auf diese Bestimmungen gestütztes Profiling.
      Die jeweilige Rechtsgrundlage, auf denen eine Verarbeitung beruht, entnehmen Sie dieser Datenschutzerklärung.
      Wenn Sie Widerspruch einlegen, werden wir Ihre betroffenen personenbezogenen Daten nicht mehr verarbeiten,
      es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen,
      die Ihre Interessen, Rechte und Freiheiten überwiegen oder die Verarbeitung dient der Geltendmachung,
      Ausübung oder Verteidigung von Rechtsansprüchen (Widerspruch nach Art. 21 Abs. 1 DSGVO).
    </p>
    <p>
      Werden Ihre personenbezogenen Daten verarbeitet, um Direktwerbung zu betreiben,
      so haben Sie das Recht, jederzeit Widerspruch gegen die Verarbeitung Sie betreffender personenbezogener Daten zum Zwecke derartiger Werbung einzulegen;
      dies gilt auch für das Profiling, soweit es mit solcher Direktwerbung in Verbindung steht.
      Wenn Sie widersprechen, werden Ihre personenbezogenen Daten anschließend nicht mehr zum Zwecke der Direktwerbung verwendet (Widerspruch nach Art. 21 Abs. 2 DSGVO).
    </p>

    <p><strong>Beschwerderecht bei der zuständigen Aufsichtsbehörde</strong></p>
    <p>
      Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde,
      insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu.
      Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.
    </p>

    <p><strong>Recht auf Datenübertragbarkeit</strong></p>
    <p>
      Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten,
      an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen.
      Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen,
      erfolgt dies nur, soweit es technisch machbar ist.
    </p>

    <p><strong>Auskunft, Berichtigung und Löschung</strong></p>
    <p>
      Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten,
      deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten.
      Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.
    </p>

    <p><strong>Recht auf Einschränkung der Verarbeitung</strong></p>
    <p>
      Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
      Hierzu können Sie sich jederzeit an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fällen:
    </p>
    <ul>
      <li>
        Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten,
        benötigen wir in der Regel Zeit, um dies zu überprüfen.
        Für die Dauer der Prüfung haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
      </li>
      <li>
        Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht,
        können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.
      </li>
      <li>
        Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung,
        Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen,
        haben Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
      </li>
      <li>
        Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben,
        muss eine Abwägung zwischen Ihren und unseren Interessen vorgenommen werden.
        Solange noch nicht feststeht, wessen Interessen überwiegen,
        haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
      </li>
    </ul>

    <p><strong>SSL- bzw. TLS-Verschlüsselung</strong></p>
    <p>
      Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte,
      wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung.
      Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt
      und an dem Schloss-Symbol in Ihrer Browserzeile.
    </p>
    <p>
      Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln,
      nicht von Dritten mitgelesen werden.
    </p>

    <p>
      Quelle: <a href="https://www.e-recht24.de" target="_blank" rel="noopener noreferrer" style={{ color: "lightblue" }}>https://www.e-recht24.de</a>
    </p>
  </div>

  <button
    onClick={() => setShowDatenschutz(false)}
    className="close-modal-btn"
    style={{ marginTop: "20px", alignSelf: "flex-end" }}
  >
    Schließen
  </button>
</Modal>


      {/* Impressum Modal */}
      <Modal
        isOpen={showImpressum}
        onRequestClose={() => setShowImpressum(false)}
        className="login-modal"
        overlayClassName="login-modal-overlay"
        ariaHideApp={false}
      >
        <div
          style={{
            color: "white",
            whiteSpace: "normal",
            maxHeight: "60vh",
            overflowY: "auto",
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
        >
          <h2>Impressum</h2>

          <p>
            <strong>Angaben gemäß § 5 Telemediengesetz (TMG):</strong>
          </p>
          <p>
            Ibrahim Öztürk
            <br />
            65474 Bischofsheim
            <br />
            Deutschland
          </p>

          <p>
            <strong>Kontakt:</strong>
          </p>
          <p>
            <br />
            E-Mail: i.ozt@gmx.de
          </p>

          <p>
            <strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 Rundfunkstaatsvertrag
              (RStV):</strong>
          </p>
          <p>
            Ibrahim Öztürk
            <br />
            65474 Bischofsheim
          </p>

          <p>
            <strong>Haftungsausschluss (Disclaimer):</strong>
          </p>
          <p>
            Trotz sorgfältiger inhaltlicher Kontrolle übernehme ich keine Haftung für
            die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind
            ausschließlich deren Betreiber verantwortlich.
          </p>

          <p>
            <strong>Urheberrecht:</strong>
          </p>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
            unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche
            gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
            der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der
            schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>

          <p>
            <strong>Online-Streitbeilegung:</strong>
          </p>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung
            (OS) bereit, die Sie hier finden:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "lightblue" }}
            >
              https://ec.europa.eu/consumers/odr
            </a>
            . Ich bin nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor
            einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </div>

        <button
          onClick={() => setShowImpressum(false)}
          className="close-modal-btn"
          style={{ marginTop: "20px" }}
        >
          Schließen
        </button>
      </Modal>
    </>
  );
}

export default Header;
