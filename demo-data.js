// Données de démonstration pour tester les nouvelles fonctionnalités
const demoData = {
  fullName: "Marie Dubois",
  jobTitle: "Développeuse Full Stack Senior",
  email: "marie.dubois@email.com",
  phone: "+33 6 12 34 56 78",
  address: "123 Rue de la République, 69000 Lyon",
  linkedin: "https://linkedin.com/in/marie-dubois",
  website: "https://marie-dubois.dev",
  github: "https://github.com/marie-dubois",
  summary: "Développeuse Full Stack passionnée avec 8 ans d'expérience dans le développement d'applications web modernes et scalables. Expertise approfondie en React, Node.js, Python et architectures cloud. Forte capacité à diriger des équipes techniques et à livrer des solutions innovantes qui répondent aux besoins métier. Passionnée par les nouvelles technologies et l'amélioration continue des processus de développement.",
  
  experience: [
    {
      title: "Lead Developer Full Stack",
      company: "TechInnovation SAS",
      location: "Lyon, France",
      period: "Mars 2021 - Présent",
      description: "• Direction technique d'une équipe de 8 développeurs sur des projets web complexes\n• Conception et développement d'une plateforme SaaS B2B utilisée par 50,000+ utilisateurs\n• Amélioration des performances de 60% grâce à l'optimisation du code et de l'architecture\n• Mise en place de pratiques DevOps, CI/CD et monitoring avancé\n• Formation et mentorat des développeurs junior\n• Collaboration étroite avec les équipes produit et design"
    },
    {
      title: "Développeuse Full Stack Senior",
      company: "StartupTech",
      location: "Paris, France",
      period: "Janvier 2019 - Février 2021",
      description: "• Développement from scratch d'une application e-commerce multi-tenant\n• Intégration de systèmes de paiement complexes (Stripe, PayPal, Adyen)\n• Optimisation SEO ayant augmenté le trafic organique de 300%\n• Mise en place d'une architecture microservices avec Docker et Kubernetes\n• Développement d'APIs RESTful et GraphQL\n• Formation des nouveaux développeurs aux bonnes pratiques"
    },
    {
      title: "Développeuse Full Stack",
      company: "WebAgency Pro",
      location: "Remote",
      period: "Juin 2017 - Décembre 2018",
      description: "• Création de sites web responsives et applications web pour des clients variés\n• Développement de composants réutilisables et de systèmes de design\n• Collaboration étroite avec les équipes UX/UI pour l'implémentation des maquettes\n• Maintenance et évolution de sites existants avec des technologies legacy\n• Optimisation des performances et de l'accessibilité web\n• Gestion de projets en méthodologie Agile/Scrum"
    },
    {
      title: "Développeuse Frontend",
      company: "Digital Solutions",
      location: "Lyon, France",
      period: "Septembre 2015 - Mai 2017",
      description: "• Développement d'interfaces utilisateur modernes et intuitives\n• Intégration de maquettes Photoshop/Figma en code HTML/CSS/JavaScript\n• Optimisation cross-browser et responsive design\n• Collaboration avec les équipes backend pour l'intégration d'APIs\n• Tests unitaires et d'intégration avec Jest et Cypress\n• Participation à la refonte complète de l'interface utilisateur principale"
    }
  ],
  
  education: [
    {
      degree: "Master en Informatique - Spécialité Développement Web",
      school: "École Supérieure d'Informatique de Lyon",
      location: "Lyon, France",
      period: "Septembre 2013 - Juin 2015",
      description: "Spécialisation en développement web full stack et architectures distribuées. Projet de fin d'études : développement d'une plateforme collaborative en temps réel.",
      grade: "Mention Très Bien - Major de promotion"
    },
    {
      degree: "Licence Informatique",
      school: "Université Claude Bernard Lyon 1",
      location: "Lyon, France",
      period: "Septembre 2010 - Juin 2013",
      description: "Formation généraliste en informatique avec focus sur la programmation, les algorithmes et les bases de données.",
      grade: "Mention Bien"
    },
    {
      degree: "Baccalauréat Scientifique - Option Informatique",
      school: "Lycée La Martinière Monplaisir",
      location: "Lyon, France",
      period: "Septembre 2007 - Juin 2010",
      description: "Spécialisation mathématiques et informatique.",
      grade: "Mention Très Bien"
    }
  ],
  
  technicalSkills: [
    { name: "JavaScript/TypeScript", level: 95 },
    { name: "React/Next.js", level: 90 },
    { name: "Node.js/Express", level: 88 },
    { name: "Python/Django", level: 85 },
    { name: "PostgreSQL/MongoDB", level: 82 },
    { name: "AWS/Azure", level: 78 },
    { name: "Docker/Kubernetes", level: 80 },
    { name: "GraphQL/REST APIs", level: 85 }
  ],
  
  softSkills: [
    { name: "Leadership technique", level: 92 },
    { name: "Communication", level: 88 },
    { name: "Résolution de problèmes", level: 95 },
    { name: "Travail en équipe", level: 90 },
    { name: "Gestion de projet", level: 85 },
    { name: "Mentorat", level: 87 }
  ],
  
  languages: [
    { name: "Français", level: "Natif" },
    { name: "Anglais", level: "Courant (C1)" },
    { name: "Espagnol", level: "Intermédiaire (B2)" },
    { name: "Allemand", level: "Débutant (A2)" }
  ],
  
  certifications: [
    {
      name: "AWS Certified Solutions Architect - Professional",
      issuer: "Amazon Web Services",
      date: "2023-08",
      url: "https://aws.amazon.com/certification/"
    },
    {
      name: "React Developer Certification",
      issuer: "Meta",
      date: "2023-03",
      url: "https://developers.facebook.com/docs/react/"
    },
    {
      name: "Kubernetes Administrator (CKA)",
      issuer: "Cloud Native Computing Foundation",
      date: "2022-11",
      url: "https://www.cncf.io/certification/cka/"
    },
    {
      name: "Scrum Master Certified",
      issuer: "Scrum Alliance",
      date: "2022-06",
      url: "https://www.scrumalliance.org/"
    }
  ],
  
  projects: [
    {
      name: "E-commerce Platform Pro",
      description: "Plateforme e-commerce complète avec gestion avancée des stocks, analytics en temps réel, et système de recommandations IA",
      technologies: ["React", "Node.js", "PostgreSQL", "Redis", "Stripe", "AWS"],
      url: "https://github.com/marie-dubois/ecommerce-platform-pro",
      startDate: "2023-01",
      endDate: "2023-08"
    },
    {
      name: "Task Management Suite",
      description: "Suite complète de gestion de tâches collaborative avec temps réel, notifications push, et intégrations multiples",
      technologies: ["Vue.js", "Socket.io", "MongoDB", "Docker", "Kubernetes"],
      url: "https://taskmanager-suite.com",
      startDate: "2022-06",
      endDate: "2023-01"
    },
    {
      name: "Analytics Dashboard",
      description: "Dashboard d'analytics avancé avec visualisations interactives et rapports automatisés pour les équipes marketing",
      technologies: ["React", "D3.js", "Python", "FastAPI", "PostgreSQL"],
      url: "https://analytics-dashboard-demo.com",
      startDate: "2022-01",
      endDate: "2022-05"
    }
  ],
  
  // Données de la bannière de recrutement
  showRecruitmentBanner: true,
  recruiterFirstName: "Sophie",
  recruiterLastName: "Martin",
  recruiterPosition: "Responsable RH",
  recruiterPhone: "+33 1 23 45 67 89",
  recruiterEmail: "sophie.martin@techcorp.com",
  companyName: "TechCorp Solutions",
  companyLogoUrl: "https://via.placeholder.com/120x60/3B82F6/FFFFFF?text=TechCorp",
  bannerImageUrl: "https://via.placeholder.com/800x200/E5E7EB/6B7280?text=Nous+Recrutons",
  bannerMessage: "Rejoignez notre équipe dynamique ! Nous recherchons un(e) Développeur(se) Full Stack passionné(e) pour contribuer à nos projets innovants.",
  bannerStyle: "modern",
  bannerColor: "#3B82F6",
  bannerHeight: "60",
  fixRecruitmentBanner: false
};

// Fonction pour charger les données de démonstration
function loadDemoData() {
  console.log('Chargement des données de démonstration...');
  
  // Remplir les champs de base
  if (document.getElementById('fullName')) document.getElementById('fullName').value = demoData.fullName;
  if (document.getElementById('jobTitle')) document.getElementById('jobTitle').value = demoData.jobTitle;
  if (document.getElementById('email')) document.getElementById('email').value = demoData.email;
  if (document.getElementById('phone')) document.getElementById('phone').value = demoData.phone;
  if (document.getElementById('address')) document.getElementById('address').value = demoData.address;
  if (document.getElementById('linkedin')) document.getElementById('linkedin').value = demoData.linkedin;
  if (document.getElementById('website')) document.getElementById('website').value = demoData.website;
  if (document.getElementById('github')) document.getElementById('github').value = demoData.github;
  if (document.getElementById('summary-text')) document.getElementById('summary-text').value = demoData.summary;
  
  // Remplir les données de la bannière de recrutement
  if (document.getElementById('showRecruitmentBanner')) {
    document.getElementById('showRecruitmentBanner').checked = demoData.showRecruitmentBanner;
    // Déclencher l'événement change pour afficher les contrôles
    document.getElementById('showRecruitmentBanner').dispatchEvent(new Event('change'));
  }
  const fixBannerCheckbox = document.getElementById('fixRecruitmentBanner');
  if (fixBannerCheckbox) fixBannerCheckbox.checked = demoData.fixRecruitmentBanner;
  if (document.getElementById('recruiterFirstName')) document.getElementById('recruiterFirstName').value = demoData.recruiterFirstName;
  if (document.getElementById('recruiterLastName')) document.getElementById('recruiterLastName').value = demoData.recruiterLastName;
  if (document.getElementById('recruiterPosition')) document.getElementById('recruiterPosition').value = demoData.recruiterPosition;
  if (document.getElementById('recruiterPhone')) document.getElementById('recruiterPhone').value = demoData.recruiterPhone;
  if (document.getElementById('recruiterEmail')) document.getElementById('recruiterEmail').value = demoData.recruiterEmail;
  if (document.getElementById('companyName')) document.getElementById('companyName').value = demoData.companyName;
  if (document.getElementById('companyLogoUrl')) document.getElementById('companyLogoUrl').value = demoData.companyLogoUrl;
  if (document.getElementById('bannerImageUrl')) document.getElementById('bannerImageUrl').value = demoData.bannerImageUrl;
  if (document.getElementById('bannerMessage')) document.getElementById('bannerMessage').value = demoData.bannerMessage;
  if (document.getElementById('bannerStyle')) document.getElementById('bannerStyle').value = demoData.bannerStyle;
  if (document.getElementById('bannerColor')) document.getElementById('bannerColor').value = demoData.bannerColor;
  if (document.getElementById('bannerHeight')) {
    document.getElementById('bannerHeight').value = demoData.bannerHeight;
    // Mettre à jour l'affichage de la valeur
    const rangeValue = document.querySelector('.range-value');
    if (rangeValue) rangeValue.textContent = demoData.bannerHeight + 'mm';
  }
  
  console.log('Données de démonstration chargées avec succès !');
  
  // Déclencher la régénération de l'aperçu
  if (window.generatePreview) {
    setTimeout(() => {
      window.generatePreview();
    }, 500);
  }
}

// Rendre la fonction disponible globalement
window.loadDemoData = loadDemoData;

// Charger automatiquement si demandé via URL
if (window.location.search.includes('demo=true')) {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(loadDemoData, 1000);
  });
}

export { demoData, loadDemoData };