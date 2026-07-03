// ============================================================================
// Tous les textes du site sont centralisés ici — c'est le seul fichier à
// éditer pour changer la "copy" (bio, services, projets, contact).
// Tout ce qui suit "TODO" est un texte provisoire ou une info à confirmer.
// ============================================================================

const SITE_CONTENT = {
  meta: {
    title: "Nicolas Boislard — Illustration & communication visuelle",
    description: "Portfolio de Nicolas Boislard — illustration, identité de marque et supports de communication.",
  },

  nav: {
    logo: "Nicolas Boislard",
    links: [
      { label: "Accueil", href: "#hero" },
      { label: "À propos", href: "#about" },
      { label: "Travaux", href: "#work" },
      { label: "Contact", href: "#contact" },
    ],
  },

  hero: {
    kicker: "Book numérique",
    title: "L'illustration avec une touche humaine.",
    subtitle: "Étudiant en communication visuelle, je donne vie à des marques et des personnages à travers l'illustration, l'identité et le design graphique.", // TODO: ajuster si besoin
    cta: { label: "Voir mes travaux", href: "#work" },
    scrollHint: "Scrollez pour décoller",
  },

  about: {
    kicker: "À propos",
    title: "Salut, moi c'est Nicolas 👋",
    paragraphs: [
      "Je suis étudiant en Bachelor - Design Graphique à l'école LYSAA Bordeaux, passionné par l'illustration et la communication visuelle depuis toujours.", // TODO: confirmer filière/école
      "Ce qui m'anime, c'est de raconter des histoires en images : donner un visage à une marque, une mascotte à un projet, ou une identité forte à un évènement.",
      "Entre dessin traditionnel et outils numériques, j'aime explorer différentes techniques pour trouver la solution visuelle la plus juste — et la plus vivante — pour chaque projet.", // TODO: ajuster ce paragraphe
    ],
    facts: [
      { label: "Basé à", value: "France" },
      { label: "Formation", value: "BTS Technicien de l'impression et un Bachelor en design graphique" },
      { label: "Disponibilité", value: "Pour Mission graphique, CDD, CDI, Projets Artiste-auteur" },
    ],
    photo: "assets/img/portrait.jpg",
  },

  services: {
    kicker: "Ce que je fais",
    title: "Des services taillés pour donner vie à vos idées",
    items: [
      {
        title: "Illustration & personnages",
        description: "Création de mascottes, personnages et illustrations narratives sur-mesure, du croquis à la version finale.",
      },
      {
        title: "Identité de marque",
        description: "Logos, chartes graphiques et guides de marque cohérents, pensés pour durer et se décliner facilement.",
      },
      {
        title: "Supports de communication",
        description: "Affiches, visuels réseaux sociaux, cartes et autres supports print & digital pour faire rayonner vos projets.",
      },
    ],
  },

  work: {
    kicker: "Travaux",
    title: "Une sélection de mes projets",
    subtitle: "Les visuels ci-dessous seront mis à jour au fil des prochains projets.", // TODO: retirer une fois le book finalisé
    filters: [
      { key: "all", label: "Tous" },
      { key: "illustration", label: "Illustration" },
      { key: "livrables", label: "Communication" },
    ],
    projects: [
      {
        id: "laura-twitch",
        title: "Laura Twitch",
        category: "illustration",
        tags: ["Illustration", "Personnage"],
        description: "Création d'un emote personnalisé pour la chaîne Twitch de Laura.", // TODO
        images: ["assets/img/illustration/laura-emote.jpg"],
      },
      {
        id: "docklight",
        title: "Docklight LYSAA",
        category: "illustration",
        tags: ["Illustration", "Identité", "Mascotte"],
        description: "Identité illustrée complète : logo, token, mascotte et exploration de formes.", // TODO
        images: [
          "assets/img/illustration/docklight-mascotte.png",
          "assets/img/illustration/docklight-logo.png",
          "assets/img/illustration/docklight-token.png",
          "assets/img/illustration/docklight-forme.jpg",
        ],
      },
      {
        id: "souvenir-inconnue",
        title: "Souvenir d'une inconnue",
        category: "illustration",
        tags: ["Illustration", "Narratif"],
        description: "Illustration narrative, une scène de plage au crépuscule.", // TODO
        images: ["assets/img/illustration/souvenir.jpg"],
      },
      {
        id: "robia",
        title: "Robia",
        category: "illustration",
        tags: ["Illustration", "Personnage", "No AI"],
        description: "Personnage robotique — projet \"No AI\", entièrement dessiné à la main.", // TODO
        images: ["assets/img/illustration/robia.jpg"],
      },
      {
        id: "nos-amies-lointain",
        title: "Nos amies lointaines",
        category: "livrables",
        tags: ["Réseaux sociaux"],
        description: "Visuels pour réseaux sociaux — formats Instagram post & story.", // TODO
        images: [
          "assets/img/livrables/nos-amies-p.jpg",
          "assets/img/livrables/nos-amies-s.jpg",
        ],
      },
      {
        id: "office-notarial-duc",
        title: "Office notarial du Duc",
        category: "livrables",
        tags: ["Branding", "Identité de marque"],
        description: "Guide de branding complet : concept, palette, typographie, logo et applications.", // TODO
        images: [
          "assets/img/livrables/branding-guide-01-cover.jpg",
          "assets/img/livrables/branding-guide-02-concept.jpg",
          "assets/img/livrables/branding-guide-03-colors.jpg",
          "assets/img/livrables/branding-guide-04-badge.jpg",
          "assets/img/livrables/branding-guide-05-mockup.jpg",
        ],
      },
      {
        id: "jika",
        title: "Jika — Carnet de visage",
        category: "livrables",
        tags: ["Affiche", "Print"],
        description: "Affiche, carte d'invitation et post pour l'exposition de peinture Jika.", // TODO
        images: [
          "assets/img/livrables/jika-affichette.jpg",
          "assets/img/livrables/jika-cartinv.jpg",
          "assets/img/livrables/jika-post-fv.jpg",
        ],
      },
      {
        id: "teaser",
        title: "Teaser vidéo",
        category: "livrables",
        tags: ["Vidéo", "Motion"],
        description: "Vidéo teaser de présentation.", // TODO
        video: "assets/video/teaser-compressed.mp4",
        poster: "assets/img/livrables/teaser-poster.jpg",
      },
    ],
  },

  pillars: {
    kicker: "Pourquoi travailler avec moi",
    title: "Ce que j'apporte à vos projets",
    items: [
      { title: "Polyvalent", description: "À l'aise sur l'illustration comme sur le design graphique — une seule personne pour couvrir plusieurs besoins." }, // TODO
      { title: "À l'écoute", description: "Je prends le temps de comprendre votre univers avant de proposer des pistes visuelles." },
      { title: "Rigoureux", description: "Du premier croquis à la livraison finale, chaque détail est pensé et vérifié." },
      { title: "Curieux", description: "Toujours en train d'explorer de nouvelles techniques et références pour nourrir mon travail." },
      { title: "Fiable", description: "Des délais clairs, annoncés à l'avance et respectés." }, // TODO
    ],
  },

  faq: {
    kicker: "FAQ",
    title: "Questions fréquentes",
    items: [
      { q: "Quel est le processus de travail ?", a: "Après un premier échange pour cerner le besoin, je propose des pistes visuelles (croquis / moodboard), puis j'affine avec vos retours jusqu'à la version finale." }, // TODO
      { q: "Quels outils utilises-tu ?", a: "Un mélange de dessin traditionnel et d'outils numériques (Procreate, Adobe Illustrator / Photoshop)." }, // TODO
      { q: "Quels sont les délais habituels ?", a: "Ça dépend de la nature du projet — je donne toujours une estimation claire avant de commencer." }, // TODO
      { q: "Travailles-tu seul ou en équipe ?", a: "Je travaille en solo, ce qui garantit une vision cohérente du début à la fin du projet." }, // TODO
    ],
  },

  contact: {
    kicker: "Contact",
    title: "Discutons de votre projet",
    message: "Une idée en tête ? Un besoin d'illustration ou d'identité visuelle ? Écrivez-moi, je réponds rapidement.", // TODO
    email: "email@exemple.com", // TODO: adresse email réelle
    cta: { label: "M'écrire", href: "Nicolas.boislard87@gmail.com" }, // TODO
    socials: [
      { label: "Instagram", url: "https://www.instagram.com/boislard_nicolas/" }, // TODO
      { label: "LinkedIn", url: "https://www.linkedin.com/in/nicolas-boislard/" }, // TODO
      { label: "Linktree", url: "https://linktr.ee/Nicolas_Boislard" }, // TODO
    ],
  },

  footer: {
    text: "Portfolio conçu et développé par Nicolas Boislard.", // TODO
  },
};
