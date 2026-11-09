/* =====================================================================
   PORTFOLIO CONTENT
   ---------------------------------------------------------------------
   Everything about you lives here. Edit the text, numbers and image
   paths below; the layout (index.html / css / main.js) picks it up
   automatically. Anything marked "TBD" is hidden on the page until you
   fill it in.
   ===================================================================== */

window.PORTFOLIO = {
  /* ---------- Basic info ---------- */
  profile: {
    name: "Thristan Edrick De Lara",
    firstName: "Thristan",
    initials: "TD",                        // navbar monogram
    course: "Bachelor of Science in Computer Science",
    courseShort: "BS Computer Science",
    school: "Biliran Province State University",
    yearLevel: "4th Year",
    location: "Looc, Cabucgayan, Biliran",
    photo: "assets/profile.jpg",
    photoAlt: "Thristan Edrick De Lara in a black suit and navy tie",
    // How the photo is cropped in the Hero frame (the file itself is never edited).
    // x: move left/right. y: larger = view moves down your body, smaller = more
    // space above your head. zoom: 1 = whole photo; higher = closer.
    photoCrop: {
      hero: { x: "53%", y: "71%", zoom: 2.4 },
    },

    // Hero
    roles: ["Computer Science Student", "Web & Mobile Developer", "Machine Learning Enthusiast"],
    // Typed out one after another after "Computer Science Student ·" in the Hero
    typedRoles: ["Web Developer", "Mobile Developer", "Machine Learning Enthusiast"],
    valueStatement:
      "4th-year Computer Science student at Biliran Province State University. I build web and mobile systems that solve real community and school problems, from barangay clean-up drives and student elections to identifying crab species with machine learning.",
    // Quick highlights under the Hero buttons.
    // value can be text, a number, or "auto:projects" / "auto:certificates" to count automatically.
    highlights: [
      { value: "auto:projects", label: "Systems built" },
      { value: "CrabLens", label: "Thesis · Machine Learning" },
      { value: "auto:certificates", label: "Certificates" },
    ],

    // About Me paragraphs
    bio: [
      "Hi! I'm Thristan Edrick De Lara, a Bachelor of Science in Computer Science student at Biliran Province State University. I enjoy building things for the web and figuring out how systems work under the hood.",
      "Most of my projects started as school requirements and turned into things I'm proud of: management systems, mobile apps and small tools that solve real problems, including my thesis application and two systems built as final requirements: a student voting system and a barangay clean-up organizer.",
      "Outside of coding, I like fishing, playing online games and listening to music. I'm always open to collaborating, learning from others and taking on new challenges.",
    ],

    // Quick facts next to the bio (icon names: school, building, calendar, pin, mail, book)
    facts: [
      { icon: "school", label: "Course", value: "BS Computer Science" },
      { icon: "building", label: "School", value: "Biliran Province State University" },
      { icon: "calendar", label: "Year Level", value: "4th Year" },
      { icon: "pin", label: "Location", value: "Looc, Cabucgayan, Biliran" },
    ],
  },

  /* ---------- Logos ----------
     Official logos stored in assets/icons/. Skills, project tech tags,
     the logo marquee and contact links look up their logo here by name.
     color: the brand color, used for the hover glow. */
  logos: {
    "Python": { src: "assets/icons/python.svg", color: "#3776AB" },
    "JavaScript": { src: "assets/icons/javascript.svg", color: "#F0C419" },
    "HTML": { src: "assets/icons/html5.svg", color: "#E34F26" },
    "CSS": { src: "assets/icons/css3.svg", color: "#1572B6" },
    "Roboflow": { src: "assets/icons/roboflow.svg", color: "#6706CE" },
    "Google Colab": { src: "assets/icons/googlecolab.svg", color: "#F9AB00" },
    "Machine Learning": { src: "assets/icons/machine-learning.svg", color: "#2563EB" },
    "Jupyter Notebook": { src: "assets/icons/jupyter.svg", color: "#F37626" },
    "Kaggle": { src: "assets/icons/kaggle.svg", color: "#20BEFF" },
    "Figma": { src: "assets/icons/figma.svg", color: "#A259FF" },
    "Canva": { src: "assets/icons/canva.svg", color: "#00C4CC" },
    "Gmail": { src: "assets/icons/gmail.svg", color: "#EA4335" },
    "LinkedIn": { src: "assets/icons/linkedin.svg", color: "#0A66C2" },
    "Instagram": { src: "assets/icons/instagram.svg", color: "#FF0069" },
  },
  // Logos shown in the scrolling strip above the skill cards (in this order)
  marquee: ["Python", "JavaScript", "HTML", "CSS", "Roboflow", "Google Colab", "Jupyter Notebook", "Kaggle", "Machine Learning", "Figma", "Canva"],

  /* ---------- Skills ----------
     level: "Proficient", "Intermediate" or "Familiar".
     logos: names from the logos list above (one or more). */
  skills: [
    {
      group: "Development",
      items: [
        { name: "Python", logos: ["Python"], level: "Intermediate", description: "Built full web and mobile applications." },
        { name: "JavaScript", logos: ["JavaScript"], level: "Familiar", description: "Basic interactivity and front-end scripting." },
        { name: "HTML & CSS", logos: ["HTML", "CSS"], level: "Intermediate", description: "Responsive layouts and styling." },
      ],
    },
    {
      group: "Machine Learning & AI",
      items: [
        { name: "Roboflow", logos: ["Roboflow"], level: "Intermediate", description: "Dataset annotation, augmentation and model training for computer vision." },
        { name: "Google Colab", logos: ["Google Colab"], level: "Familiar", description: "Training and testing ML models in notebooks." },
        { name: "Machine Learning (Model Training)", logos: ["Machine Learning"], level: "Familiar", description: "Image classification models, applied in my thesis project CrabLens." },
        { name: "Jupyter Notebook", logos: ["Jupyter Notebook"], level: "Familiar", description: "Data preprocessing and model training experiments." },
        { name: "Kaggle", logos: ["Kaggle"], level: "Familiar", description: "Sourcing datasets for machine learning projects." },
      ],
    },
    {
      group: "Design & Prototyping",
      items: [
        { name: "Figma", logos: ["Figma"], level: "Intermediate", description: "UI design and interactive prototypes." },
        { name: "Canva", logos: ["Canva"], level: "Intermediate", description: "Graphics, presentations and visual materials." },
      ],
    },
  ],
  softSkills: ["Problem Solving", "Teamwork", "Communication", "Willingness to Learn", "Adaptability"],

  /* ---------- Projects ----------
     Each project opens as a mini case study.
     featured: true shows it as the large card (use it for one project).
     device:   "phone" for portrait mobile screenshots, otherwise "desktop".
     cover:    images shown on the card (phones: 2–3 screenshots side by side).
     coverPosition: optional focus point for a wide cover, e.g. "left top".
     gallery:  screenshots in the case study, each with a short caption.
     tech:     names matching the logos list get their logo automatically.
     bars:     optional bar chart in the case study ({ title, note, items: [{ label, value }] }, value in %).
     scan:     (featured phone project) animated detection box drawn over one cover screenshot.
     fullTitle: optional long title shown in the case study (the card uses title).
     tag:      one badge, or a list of badges, e.g. ["Research Study", "Machine Learning"].
     icon / color: optional small icon on the card (icon names: leaf).
     process / results: extra case-study sections; "TBD" hides them.
     galleryNote: small note under the screenshots.
     role / demo / github: "TBD" or "" hides that part. */
  projects: [
    {
      id: "crablens",
      title: "CrabLens",
      featured: true,
      category: "Mobile",
      tag: "Thesis",
      year: "2026",
      description: "A mobile app that identifies crab species from the camera or a photo and tells you whether each one is edible or poisonous.",
      problem: "Many crab species look alike, and some of them are poisonous. People who catch, buy or come across crabs often can't tell which ones are safe.",
      solution: "CrabLens recognizes 14 crab species using a computer-vision model, either live through the phone camera or from an uploaded photo. It then shows the species' safety status, habitat and scientific name.",
      role: "TBD",
      tech: ["Machine Learning", "YOLOv8", "Roboflow", "Google Colab", "Python"],
      features: [
        "Live camera detection with a labeled box and confidence score",
        "Identify a crab from an uploaded photo",
        "Safety status for each species: edible, poisonous or unknown",
        "Habitat data and scientific names for 14 supported species",
        "Scan history kept only on the phone and deleted after 30 days",
      ],
      bars: {
        title: "Model confidence on sample scans",
        note: "From the app's scan history.",
        items: [
          { label: "Devil Reef Crab", value: 100 },
          { label: "Mud Crab", value: 100 },
          { label: "Land Crab", value: 99.7 },
          { label: "Horrid Elbow Crab", value: 99.3 },
        ],
      },
      device: "phone",
      // crablens-live.jpg is the live-detection screenshot with the drawn box removed,
      // so the site can animate its own box on top (positions in image pixels, 720×1515)
      cover: ["assets/projects/crablens-1.jpg", "assets/projects/crablens-live.jpg", "assets/projects/crablens-5.jpg"],
      scan: {
        cover: 1,
        size: [720, 1515],
        box: [54, 591, 584, 411],
        label: "Devil Reef Crab · POISONOUS · 100%",
      },
      gallery: [
        { src: "assets/projects/crablens-1.jpg", caption: "Home screen" },
        { src: "assets/projects/crablens-2.jpg", caption: "Live detection: Devil Reef Crab flagged as poisonous" },
        { src: "assets/projects/crablens-3.jpg", caption: "Image upload" },
        { src: "assets/projects/crablens-4.jpg", caption: "Identifying a crab from a photo" },
        { src: "assets/projects/crablens-5.jpg", caption: "Scan history with safety labels" },
        { src: "assets/projects/crablens-6.jpg", caption: "Splash screen" },
      ],
      demo: "TBD",
      github: "TBD",
    },
    {
      id: "botoko",
      title: "BotoKo",
      category: "Web",
      tag: "Final Requirement",
      year: "2026",
      description: "A voting system for student elections that handles voter access, ballot casting and automatic vote counting, built as one of my final requirements.",
      problem: "Paper-based student council elections take a long time to count, and it's hard to make sure every student votes exactly once.",
      solution: "BotoKo lets each voter log in with a Voter ID issued by the student COMELEC, pick one candidate per position, review the ballot and submit it once. Voters get a receipt code, and results update live for everyone to see.",
      role: "TBD",
      tech: ["Python", "Flask", "HTML", "CSS", "JavaScript"],
      features: [
        "Voter accounts created by the student COMELEC only",
        "One vote per voter, with a review step before submitting",
        "Receipt code and timestamp after voting",
        "Live results with turnout and leading or tied candidates",
        "Projector mode for showing results on a big screen",
      ],
      device: "desktop",
      cover: ["assets/projects/botoko-4.jpg"],
      coverPosition: "left top",
      gallery: [
        { src: "assets/projects/botoko-1.jpg", caption: "Voter login" },
        { src: "assets/projects/botoko-2.jpg", caption: "Ballot: one candidate per position" },
        { src: "assets/projects/botoko-3.jpg", caption: "Vote receipt with a unique code" },
        { src: "assets/projects/botoko-4.jpg", caption: "Live results dashboard" },
      ],
      demo: "TBD",
      github: "TBD",
    },
    {
      id: "ecobayanihan",
      title: "EcoBayanihan",
      category: "Web",
      tag: "Final Requirement",
      year: "2025",
      description: "A clean-up drive organizer for barangays. Helps barangay officials plan clean-up activities, gather volunteers and keep track of community participation.",
      problem: "Barangay clean-up drives are usually organized by word of mouth, so it's hard to know who signed up, who actually joined and how active each volunteer is.",
      solution: "EcoBayanihan gives volunteers one place to register, log in and join clean-up events, while barangay officials manage events, registrations and participants from an admin dashboard. Volunteers earn points for taking part.",
      role: "TBD",
      tech: ["Python", "Django", "HTML", "CSS"],
      features: [
        "Volunteer registration and login",
        "Events grouped into previous, current and upcoming drives",
        "Participation points for volunteers",
        "Admin dashboard for events, registrations, participants and activities",
      ],
      device: "desktop",
      cover: ["assets/projects/ecobayanihan-1.jpg"],
      gallery: [
        { src: "assets/projects/ecobayanihan-1.jpg", caption: "Landing page" },
        { src: "assets/projects/ecobayanihan-2.jpg", caption: "Volunteer view: choose an event and see your points" },
        { src: "assets/projects/ecobayanihan-3.jpg", caption: "Admin dashboard" },
      ],
      demo: "TBD",
      github: "TBD",
    },
    {
      id: "plant-disease",
      title: "Plant Disease Detection",
      fullTitle: "Plant Disease Detection Using CNN-Based Image Processing: A Study on Apple, Corn, Grape, and Tomato",
      category: "Web",
      tag: ["Research Study", "Machine Learning"],
      icon: "leaf",          // small icon shown on the card and in the case study
      color: "#22c55e",      // its color
      description: "A web application that detects diseases from photos of plant leaves using a Convolutional Neural Network trained on apple, corn, grape and tomato leaf images.",
      problem: "Farmers and gardeners often can't recognize plant diseases early, which leads to crop loss and wrong treatment.",
      solution: "A CNN model trained in Python that classifies a leaf image into its plant disease and shows how confident it is.",
      process: "Gathered leaf image datasets from Kaggle, then preprocessed the data and trained and evaluated the CNN model in Python using Jupyter Notebook.",
      role: "TBD",
      results: "TBD",        // shown as a "Results" section once filled in
      // TBD: add the web framework the app runs on (e.g. "Django" or "Flask") to this list
      tech: ["Python", "CNN", "Jupyter Notebook", "Kaggle"],
      features: [
        "Supports four crops: Apple, Corn, Grape and Tomato",
        "Two input options: File Upload (drag and drop or browse) and Camera",
        "\"Analyze Plant\" returns the Top 3 predictions with confidence percentages and bars",
        "\"All Possible Diseases\" breakdown for the detected result",
      ],
      device: "desktop",
      // Clean recreations of the original screens; editable sources are in assets/projects/mockups/
      cover: ["assets/projects/plant-results.png"],
      gallery: [
        { src: "assets/projects/plant-upload.png", caption: "Upload a leaf photo by file or camera" },
        { src: "assets/projects/plant-results.png", caption: "Top 3 predictions with confidence bars" },
      ],
      galleryNote: "Interface recreated from the original application.",
      demo: "TBD",
      github: "TBD",
    },
  ],

  /* ---------- Achievements (certificates) ----------
     date:   "YYYY-MM-DD" (used for sorting, newest first) or "TBD"
     thumb:  small image shown on the card (for a PDF, a PNG of page 1)
     file:   what opens in the lightbox: an image, or a PDF (opens in a new tab)
     The order here doesn't matter; the page sorts by date. */
  achievements: [
    {
      title: "Introduction to AI Literacy and Responsible Use",
      issuer: "Mapúa University × CHED ACHIEVE (with Arizona State University)",
      date: "2026-09-14",
      description: "Micro-credentials course on AI literacy and the responsible use of AI.",
      thumb: "assets/achievements/thumbs/cert-ai-literacy-mapua-2026.jpg",
      file: "assets/achievements/cert-ai-literacy-mapua-2026.webp",
    },
    {
      title: "Networking Basics",
      issuer: "Cisco Networking Academy",
      date: "2026-05-21",
      description: "Certificate for successfully completing the Networking Basics course.",
      thumb: "assets/achievements/thumbs/cert-networking-basics-cisco-2026.jpg",
      file: "assets/achievements/cert-networking-basics-cisco-2026.jpg",
    },
    {
      title: "Networking Basics: Course Completion Credential",
      issuer: "Cisco Networking Academy",
      date: "2026-05-21",
      description: "Student-level credential: network types, protocols, Ethernet, IPv4/IPv6 addressing, routing and troubleshooting.",
      thumb: "assets/achievements/thumbs/cert-networking-basics-cisco-2026-credential.jpg",
      file: "assets/achievements/cert-networking-basics-cisco-2026-credential.jpg",
    },
    {
      title: "Integrated OS: Be More Digi-TALINO (Webinar)",
      issuer: "Integrated Office Solutions, Inc.",
      date: "2025-09-05",
      description: "Webinar on digital literacy: productivity apps, digital communication, smart research, and data safety and security.",
      thumb: "assets/achievements/thumbs/cert-digi-talino-integrated-os-2025.jpg",
      file: "assets/achievements/cert-digi-talino-integrated-os-2025.jpg",
    },
    {
      title: "Integrating ChatGPT with Excel (Webinar)",
      issuer: "Koenig",
      date: "2024-11-25",
      description: "Certificate of participation for attending the webinar.",
      thumb: "assets/achievements/thumbs/cert-chatgpt-excel-koenig-2024.jpg",
      file: "assets/achievements/cert-chatgpt-excel-koenig-2024.jpg",
    },
    {
      title: "Thesis Preparation with the Use of Trending Tools and Industry Practices (Seminar-Workshop)",
      issuer: "Biliran Province State University · Computer Science Society",
      date: "2025-10-07",
      description: "Two-day seminar-workshop on October 6–7, 2025 at the BiPSU Student Center.",
      thumb: "assets/achievements/thumbs/cert-thesis-preparation-bipsu-css-2025.jpg",
      file: "assets/achievements/cert-thesis-preparation-bipsu-css-2025.jpg",
    },
    {
      title: "Mastering English Foundations, Upholding Academic Integrity, and Advancing Gender-Fair Writing (Seminar-Workshop)",
      issuer: "Biliran Province State University · Computer Science Society",
      date: "2025-04-29",
      description: "Seminar-workshop held at the BiPSU Student Center, Main Campus, Naval, Biliran.",
      thumb: "assets/achievements/thumbs/cert-english-academic-integrity-bipsu-css-2025.jpg",
      file: "assets/achievements/cert-english-academic-integrity-bipsu-css-2025.jpg",
    },
    {
      title: "Unplug & Unwind: Redefining Digital Connection and Safe Spaces (Seminar)",
      issuer: "Biliran Province State University · Computer Science Society",
      date: "2024-02-09",
      description: "Certificate of participation for the one-day seminar.",
      thumb: "assets/achievements/thumbs/cert-unplug-unwind-bipsu-css-2024.jpg",
      file: "assets/achievements/cert-unplug-unwind-bipsu-css-2024.jpg",
    },
  ],

  /* ---------- Contact ---------- */
  contact: {
    heading: "Let's work together",
    text: "Have a project, an internship opening or just want to say hi? Send me a message and I'll get back to you as soon as I can.",
    email: "thristanedrickdelara@gmail.com",
  },

  // logo: a name from the logos list. A link with an empty url ("") is hidden.
  socials: [
    { label: "Email", logo: "Gmail", url: "mailto:thristanedrickdelara@gmail.com", handle: "thristanedrickdelara@gmail.com" },
    { label: "LinkedIn", logo: "LinkedIn", url: "https://www.linkedin.com/in/thristan-edrick-de-lara-a26a43449", handle: "Thristan Edrick De Lara" },
    { label: "Instagram", logo: "Instagram", url: "https://www.instagram.com/datboii_.in4k", handle: "@datboii_.in4k" },
    { label: "GitHub", icon: "github", url: "", handle: "" },
  ],
};
