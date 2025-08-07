/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation"; // Rename to your file name for custom animation

// Splash Screen

const splashScreen = {
  enabled: true, // set false to disable splash screen
  animation: splashAnimation,
  duration: 2000 // Set animation duration as per your animation
};

// Summary And Greeting Section

const illustration = {
  animated: true // Set to false to use static SVG
};

const greeting = {
  username: "Ibrahim",
  title: "Hi, ich bin Ibrahim",
  subTitle: (
    <>
      Software Entwickler<br />
    </>
  ),
  resumeLink: "",
  displayGreeting: true
};


// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/IbrahimOE",
  linkedin: "https://www.linkedin.com/notifications/?filter=all",
  mail: "i.ozt@gmx.de",
  facebook: "",
  medium: "",
  stackoverflow: "",
  // Instagram, Twitter and Kaggle are also supported in the links!
  // To customize icons and social links, tweak src/components/SocialMedia
  display: true // Set true to display this section, defaults to false
};
//Animation

export const contactAnimationInfo = {
  display: true,
  messages: [
    "Let's build something amazing together!",
    "Reach out for collaboration!",
    "Your next project starts here."
  ],
};




// Educationinfo
const educationInfo = {
  display: true,
  schools: [
    {
      schoolName: "Fundierter IT-Spezialist",
      logo: require("./assets/images/1.png"),
      subHeader: "Cybersecurity & Forensik | Seit Beginn der Ausbildung",
      duration: "Analysiere Systeme auf Schwachstellen und entwickle Schutzstrategien",
      desc: "Kenntnisse in Sicherheitsanalysen, Penetration Testing, Problemlösung",
      descBullets: [
        
      ]
    },
    {
      schoolName: "Technischer Problemlöser",
      logo: require("./assets/images/2.png"),
      subHeader: "Kenntnisse in Sicherheitsanalysen, Penetration Testing, Problemlösung",
      duration: "Kreative Lösungen für technische Herausforderungen",
      desc: "Erfahrung mit JavaScript, Python, React, Webapplikationen",
      descBullets: [
    
      ]
    },
    {
      schoolName: "Meister der Manipulation und Täuschungstechnik",
      logo: require("./assets/images/stanfordLogo.png"),
      subHeader: "Strategisches Denken & Menschenkenntnis",
      duration: "",
      desc: "Mit klarem Verstand und Einfühlungsvermögen lenke ich Situationen und erkenne verborgene Motive, um optimale Ergebnisse zu erzielen.",
      descBullets: [
        
      ]
    },
    {
      schoolName: "Analytischer Visionär",
      logo: require("./assets/images/4.png"),
      subHeader: "Fokussiert, zielstrebig und reflektiert",
      duration: "Kontinuierlich",
      desc: "Ich arbeite strukturiert und überlegt, um komplexe Probleme zu lösen und nachhaltige Erfolge zu erzielen.",
      descBullets: [
        "Starke Fähigkeit zur kritischen Analyse und Problemlösung",
        "Disziplinierter und selbstbewusster Arbeitsstil",
        "Offenheit für neue Perspektiven und kontinuierliches Lernen",
        "Leidenschaft für nachhaltige und innovative Lösungen"
      ]
    }
  ]
};







// Skills Section

const skillsSection = {
  title: "Was ich mache",
  subTitle: "Cybersecurity, digitale Forensik und moderne Entwicklung",
  skills: [
    emoji(
      "⚡ Analyse und Aufdeckung digitaler Schwachstellen und Spuren"
    ),
    emoji("⚡ Entwicklung und Testing von Webanwendungen"),
    emoji(
      "⚡ IT-Forensik, Penetration Testing und Social Engineering"
    )
  ],

  /* Make Sure to include correct Font Awesome Classname to view your icon
https://fontawesome.com/icons?d=gallery */

  softwareSkills: [
    {
      skillName: "html-5",
      fontAwesomeClassname: "fab fa-html5"
    },
    {
      skillName: "css3",
      fontAwesomeClassname: "fab fa-css3-alt"
    },
    {
      skillName: "sass",
      fontAwesomeClassname: "fab fa-sass"
    },
    {
      skillName: "JavaScript",
      fontAwesomeClassname: "fab fa-js"
    },
    {
      skillName: "reactjs",
      fontAwesomeClassname: "fab fa-react"
    },
    {
      skillName: "nodejs",
      fontAwesomeClassname: "fab fa-node"
    },
    {
      skillName: "swift",
      fontAwesomeClassname: "fab fa-swift"
    },
    {
      skillName: "npm",
      fontAwesomeClassname: "fab fa-npm"
    },
    {
      skillName: "sql-database",
      fontAwesomeClassname: "fas fa-database"
    },
    {
      skillName: "aws",
      fontAwesomeClassname: "fab fa-aws"
    },
    {
      skillName: "firebase",
      fontAwesomeClassname: "fas fa-fire"
    },
    {
      skillName: "python",
      fontAwesomeClassname: "fab fa-python"
    },
    {
      skillName: "docker",
      fontAwesomeClassname: "fab fa-docker"
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Education Section


// Your top 3 proficient stacks/tech experience

const techStack = {
  viewSkillBars: true, //Set it to true to show Proficiency Section
  experience: [
    {
      Stack: "Manipulationstechnik", //Insert stack or technology you have experience in
      progressPercentage: "90%" //Insert relative proficiency in percentage
    },
    {
      Stack: "Webentwicklung",
      progressPercentage: "70%"
    },
    {
      Stack: "Programmierung",
      progressPercentage: "70%"
    }
  ],
  displayCodersrank: true // Set true to display codersrank badges section need to changes your username in src/containers/skillProgress/skillProgress.js:17:62, defaults to false
};

// Work experience section

const workExperiences = {
  display: true, //Set it to true to show workExperiences Section
  experience: [
    {
      role: "Aircraft Technican",
      company: "Lufthansa Technik",
      companylogo: require("./assets/images/LHT.jpg"),
      date: "August 2022 – August 2023",
      desc: "Technischer Support für Airbus A320 Familie"
    },
    
    {
      role: "Computer Science Expert",
      company: "AirPlus",
      companylogo: require("./assets/images/AirPlus.png"),
      date: "August 2023 - Februar 2026",
      desc: "Softwareentwicklung, IT-Sicherheit und Systemadministration",
      descBullets: [
   
      ]
    },
    {
      role: "IT-Forensik & Cybercrime",
      company: "Landeskriminalamt Hessen",
      companylogo: require("./assets/images/LKA.jpg"),
      date: "Februar 2026",
      desc: "Ermittlungen im Bereich Cybercrime, Forensik und digitale Beweissicherung."
    }
  ]
};

/* Your Open Source Section to View Your Github Pinned Projects
To know how to get github key look at readme.md */

const openSource = {
  showGithubProfile: "true", // Set true or false to show Contact profile using Github, defaults to true
  display: true // Set false to hide this section, defaults to true
};

// Some big projects you have worked on

const bigProjects = {
  title: "Große Projekte",
  subtitle: "Ausgewählte Projekte, bei denen Technik und Innovation im Mittelpunkt stehen",
  projects: [
    {
      image: require("./assets/images/FBW.jpg"),
      projectName: "FBW A320",
      projectDesc: "Entwicklung eines Simulationsmoduls für das Fly-by-Wire-System",
      footerLink: [
        {
          name: "Visit Website",
          url: "https://flybywiresim.com/"
        }
        //  you can add extra buttons here.
      ]
    },
    {
      image: require("./assets/images/GPT.png"),
      projectName: "Identity Breach Analyzer",
      projectDesc: "Entwicklung einer Exploit- und Analyseplattform ",
      footerLink: [
        {
          name: "Demo auf Anfrage",
          url: ""
        }
      ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Achievement Section
// Include certificates, talks etc

const achievementSection = {
  title: emoji("Achievements & Zertifikate 🏆 "),
  subtitle:
    "Zertifikate, Talks und besondere Auszeichnungen",

  achievementsCards: [
    {
      title: "Cisco Networking Essentials",
      subtitle:
        "Erfolgreiche Teilnahme am Cisco Networking Academy Kurs.",
      image: require("./assets/images/cisco.png"),
      imageAlt: "Cisco Logo",
      footerLink: [
        
       
        {
          name: "WEB-Based",
          url: "https://opensource.googleblog.com/2019/01/google-code-in-2018-winners.html"
        }
      ]
    },
  

    {
      title: "IT-Forensik Bootcamp",
      subtitle: "Intensivkurs für digitale Beweissicherung und Cybercrime-Methodik",
      image: require("./assets/images/IT.png"),
      imageAlt: "PWA Logo",
      footerLink: [
        {name: "Certification", url: ""},
      
      ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Blogs Section

const blogSection = {
  title: "Blogs",
  subtitle:
    "With Love for Developing cool stuff, I love to write and teach others what I have learnt.",
  displayMediumBlogs: "true", // Set true to display fetched medium blogs instead of hardcoded ones
  blogs: [
    {
      url: "https://blog.usejournal.com/create-a-google-assistant-action-and-win-a-google-t-shirt-and-cloud-credits-4a8d86d76eae",
      title: "Win a Google Assistant Tshirt and $200 in Google Cloud Credits",
      description:
        "Do you want to win $200 and Google Assistant Tshirt by creating a Google Assistant Action in less then 30 min?"
    },
    {
      url: "https://medium.com/@saadpasta/why-react-is-the-best-5a97563f423e",
      title: "Why REACT is The Best?",
      description:
        "React is a JavaScript library for building User Interface. It is maintained by Facebook and a community of individual developers and companies."
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Talks Sections

const talkSection = {
  title: "TALKS",
  subtitle: emoji(
    "I LOVE TO SHARE MY LIMITED KNOWLEDGE AND GET A SPEAKER BADGE 😅"
  ),

  talks: [
    {
      title: "Build Actions For Google Assistant",
      subtitle: "Codelab at GDG DevFest Karachi 2019",
      slides_url: "https://bit.ly/saadpasta-slides",
      event_url: "https://www.facebook.com/events/2339906106275053/"
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Podcast Section

const podcastSection = {
  title: emoji("Podcast 🎙️"),
  subtitle: "I LOVE TO TALK ABOUT MYSELF AND TECHNOLOGY",

  // Please Provide with Your Podcast embeded Link
  podcast: [
    "https://anchor.fm/codevcast/embed/episodes/DevStory---Saad-Pasta-from-Karachi--Pakistan-e9givv/a-a15itvo"
  ],
  display: false // Set false to hide this section, defaults to true
};

// Resume Section
const resumeSection = {
  title: "Resume",
  subtitle: "Feel free to download my resume",

  // Please Provide with Your Podcast embeded Link
  display: false // Set false to hide this section, defaults to true
};

const contactInfo = {
  title: emoji("Contact Me ☎️"),
  subtitle:
    "",
  number: "",
  email_address: ""
};

// Twitter Section

const twitterDetails = {
  userName: "elonmusk", //Replace "twitter" with your twitter username without @
  display: false // Set true to display this section, defaults to false
};

const isHireable = false; // Set false if you are not looking for a job. Also isHireable will be display as Open for opportunities: Yes/No in the GitHub footer

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  podcastSection,
  contactInfo,
  twitterDetails,
  isHireable,
  resumeSection
};
