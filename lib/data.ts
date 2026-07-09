// Content ported verbatim from design_handoff_portfolio_nicolas/Site Portfolio One Page.dc.html
// (the "hifi" design reference — texts and data are final, see the handoff README).

export type ApSection = "apropos" | "diplomes" | "outils" | "passions";

export const sectionsApropos: Record<
  ApSection,
  { label: string; titre: string; paras: string[] }
> = {
  apropos: {
    label: "halte — à propos du pilote",
    titre: "Le pilote",
    paras: [
      "Designer graphique passionné par la narration visuelle. Fort d'une solide expérience sur la suite Adobe, Figma et Procreate, j'explore également le potentiel de l'IA générative. ",
      "Fortement influencé par la culture webtoon , manga et la littérature fantasy, j'aime insuffler cette richesse imaginaire dans mes créations graphiques. ",
    ],
  },
  diplomes: {
    label: "carnet de vol — diplômes",
    titre: "Mes diplômes",
    paras: [
      "Formation initiale en artisanat du bois, puis réorientation vers les arts graphiques après une blessure.",
      "Mon parcours a débuté par un Bac pro en communication pluri-média, suivi d'un BTS dans les industries graphiques. Après une première véritable immersion professionnelle d'un an en intérim, j'ai choisi de parfaire ma vision globale du métier en rejoignant un Bachelor en design graphique.",
    ],
  },
  outils: {
    label: "instruments de bord — outils",
    titre: "Mes outils",
    paras: ["Huit ans de vol sur la suite Adobe, complétés par les outils de nouvelle génération."],
  },
  passions: {
    label: "constellations — passions",
    titre: "Mes passions",
    paras: [
      "Passionné d'art depuis toujours, j'ai exploré de multiples disciplines allant de la musique à la peinture, en passant par l'écriture. ",
      "J'ai ce besoin profond d'utiliser mes mains pour créer, façonner et sublimer les médiums. Aujourd'hui, je suis ravi de pouvoir insuffler cette sensibilité artistique, qui me forge au quotidien, directement dans mon métier de designer graphique.",
    ],
  },
};

export const diplomes = [
  { periode: "Bac pro - Limoges", titre: "Communication pluri-média" },
  { periode: "BTS ERPC - Limoges", titre: "Industries graphiques" },
  { periode: "1 an - Freelance", titre: "Artiste - Auteur " },
  { periode: "Bachelor à LYsaa - Bordeaux", titre: "Design graphique - option design d'auteur" },
];

export const passions = [
  { nom: "Musique", bg: "#33210F", fg: "#E3A85C", img: "/assets/musique.svg", taille: 60 },
  { nom: "Lecture & écriture", bg: "#C86A34", fg: "#F2D8AE", img: "/assets/lecture-ecriture.svg", taille: 60 },
  { nom: "Peinture & dessin", bg: "#3D5FA8", fg: "#BBD3FA", img: "/assets/peinture-dessin.svg", taille: 60 },
  { nom: "Jeu vidéo", bg: "#2E8F82", fg: "#B0F5E8", img: "/assets/jeuxvideo.svg", taille: 60 },
];

export const outils = [
  { mono: "Ps", nom: "Photoshop", bg: "#001E36", fg: "#31A8FF", img: undefined as string | undefined, taille: undefined as number | undefined },
  { mono: "Ai", nom: "Illustrator", bg: "#330000", fg: "#FF9A00", img: undefined, taille: undefined },
  { mono: "Id", nom: "InDesign", bg: "#49021F", fg: "#FF3366", img: undefined, taille: undefined },
  { mono: "Fi", nom: "Figma", bg: "#1E1E2E", fg: "#A259FF", img: "/assets/figma.svg", taille: 26 },
  { mono: "Pc", nom: "Procreate", bg: "#000000", fg: "#9FE8E4", img: "/assets/procreate.svg", taille: 64 },
  { mono: "Cl", nom: "Claude", bg: "#1F1E1B", fg: "#D97757", img: "/assets/claude.svg", taille: 34 },
];

export const defsLunes = [
  { key: "apropos" as ApSection, label: "À PROPOS", left: 742, top: 216, dur: 7, delay: 0, bg: "radial-gradient(circle at 35% 30%, #E2A878, #9C5B33)" },
  { key: "diplomes" as ApSection, label: " DIPLÔMES", left: 1210, top: 380, dur: 9, delay: 1, bg: "radial-gradient(circle at 35% 30%, #D7C9F6, #7C63C8)" },
  { key: "passions" as ApSection, label: "PASSIONS", left: 700, top: 782, dur: 8, delay: 0.5, bg: "radial-gradient(circle at 35% 30%, #FFB09A, #C7554E)" },
  { key: "outils" as ApSection, label: " OUTILS", left: 1160, top: 740, dur: 10, delay: 1.5, bg: "radial-gradient(circle at 35% 30%, #9FE8E4, #3E8F8B)" },
];

export type MediaItem =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string; poster: string };

const CLD = "https://res.cloudinary.com/qskcnpps/image/upload/portfolio";
const CLD_V = "https://res.cloudinary.com/qskcnpps/video/upload/portfolio";

const img = (path: string, alt?: string): MediaItem => ({ type: "image", src: `${CLD}/${path}`, alt });
const vid = (path: string, poster: string): MediaItem => ({ type: "video", src: `${CLD_V}/${path}`, poster: `${CLD}/${poster}` });

export const projets = [
  {
    titre: "Docklight — spectacle de drones",
    desc: "Identité visuelle pour un spectacle son et lumière imaginé pour le bassin des Lumières à Bordeaux : une flotte de drones dessinant le ciel nocturne. Logo, mascotte, jeton d'identité et déclinaisons d'affiches.",
    tags: ["Identité de marque", "Événementiel", "Illustrator"],
    bg: "radial-gradient(circle at 32% 28%, #A8F0E8 0%, #5FC4BC 38%, #2E7A8A 68%, #14243E 100%)",
    cover: img("docklight/logo-1.jpg", "Docklight — logo"),
    gallery: [
      img("docklight/logo-1.jpg", "Logo"),
      img("docklight/mascotte-1.jpg", "Mascotte"),
      img("docklight/token-1.jpg", "Jeton d'identité"),
      img("docklight/affiche-1.jpg", "Affiche — 1er jet"),
      img("docklight/affiche-2.jpg", "Affiche — 2e jet"),
    ],
  },
  {
    titre: "CEVA — campagne de prévention",
    desc: "Série d'affiches et de formats 4×3 pour une campagne de sensibilisation à la zoonose, menée pour CEVA Santé Animale, avec mockups d'affichage urbain.",
    tags: ["Affiche", "Campagne", "Print"],
    bg: "radial-gradient(circle at 32% 28%, #C8F0A0 0%, #7FBE5A 38%, #3E7A4A 68%, #1C3A28 100%)",
    cover: img("ceva/mockup.jpg", "CEVA — mockup"),
    gallery: [
      img("ceva/mockup.jpg", "Mockup affichage"),
      img("ceva/metro.jpg", "Affichette métro"),
      img("ceva/affiche-4m-1.jpg", "Affiche 4m"),
      img("ceva/affiche-8m-1.jpg", "Affiche 8m²"),
    ],
  },
  {
    titre: "Stage EPNAK — supports de communication",
    desc: "Réalisé pendant un stage à la direction territoriale de l'EPNAK, un établissement de réadaptation professionnelle pour travailleurs handicapés : une sélection de projets menés sur place, choisis parmi ceux qui me semblaient les plus pertinents.",
    tags: ["Stage", "Affiche", "Print"],
    bg: "radial-gradient(circle at 32% 28%, #FFD6A0 0%, #E8A85E 38%, #A8683C 68%, #4A2E1C 100%)",
    cover: img("stage-epnak/affichette-1-1.jpg", "Stage EPNAK — affichette"),
    gallery: [
      img("stage-epnak/affichette-1-1.jpg", "Affichette A3"),
      img("stage-epnak/affichette-2-1.jpg", "Affichette A3 — variante"),
      img("stage-epnak/muret-1.jpg", "Muret"),
    ],
  },
  {
    titre: "DBG — Dur Battu Gazon",
    desc: "Pour la marque de balles de tennis DBG (Dur Battu Gazon), un projet de groupe où j'ai conçu le carton d'abonnement premium destiné aux clients fidèles, avec ses offres associées.",
    tags: ["Packaging", "Identité de marque", "Travail de groupe"],
    bg: "radial-gradient(circle at 32% 28%, #E8F09A 0%, #B8CC4E 38%, #6E8A2E 68%, #2C3A14 100%)",
    cover: img("dbg/carton-1.jpg", "DBG — carton d'abonnement"),
    gallery: [img("dbg/carton-1.jpg", "Carton d'abonnement"), img("dbg/carton-2.jpg", "Carton — détail")],
  },
  {
    titre: "Stack — identité de marque vaisselle",
    desc: "Identité visuelle pour Stack, une marque de vaisselle : logotype, mockups d'assiettes et détails de finition, avec une entière liberté créative.",
    tags: ["Identité de marque", "Packaging", "Branding"],
    bg: "radial-gradient(circle at 32% 28%, #FFDCC0 0%, #F0A878 38%, #B85E4E 68%, #4A2028 100%)",
    cover: img("stack/front.jpg", "Stack — vaisselle"),
    gallery: [img("stack/front.jpg", "Vue de face"), img("stack/logo-1.jpg", "Logo"), img("stack/detail.jpg", "Détail")],
  },
  {
    titre: "Roomhack — publicité verticale",
    desc: "Pour Roomhack, une enseigne de meubles pensée pour les ados et jeunes adultes : une publicité au format vertical et une identité graphique, réalisées avec une deadline très courte.",
    tags: ["Publicité", "Identité de marque", "Motion"],
    bg: "radial-gradient(circle at 32% 28%, #F0C8FF 0%, #C87EE8 38%, #7C3EA0 68%, #2E1450 100%)",
    cover: vid("roomhack/teaser.mp4", "roomhack/poster.jpg"),
    gallery: [vid("roomhack/teaser.mp4", "roomhack/poster.jpg")],
  },
  {
    titre: "Le Village des Murmures — teaser",
    desc: "Identité graphique pour une murder party, centrée sur son produit phare : un teaser vidéo. Un pari risqué de travailler en solo plutôt qu'en groupe, pour s'éloigner du brief initial.",
    tags: ["Identité de marque", "Motion", "Vidéo"],
    bg: "radial-gradient(circle at 32% 28%, #D8C0FF 0%, #9C6EE0 38%, #5A2E8A 68%, #200E3A 100%)",
    cover: vid("village-des-murmures/teaser.mp4", "village-des-murmures/poster.jpg"),
    gallery: [
      vid("village-des-murmures/teaser.mp4", "village-des-murmures/poster.jpg"),
      img("village-des-murmures/presentation-01.jpg", "Présentation du projet"),
    ],
  },
  {
    titre: "Faire-part de mariage — exercice d'impression",
    desc: "Un exercice personnel autour des techniques d'impression : gaufrage et dorure à chaud simulés. Le rouge est en relief creusé, le bleu en dorure à chaud.",
    tags: ["Print", "Exercice", "Finition"],
    bg: "radial-gradient(circle at 32% 28%, #FFE8B0 0%, #E8B85E 38%, #A87E2E 68%, #4A3612 100%)",
    cover: img("faire-part/recto.jpg", "Faire-part — recto"),
    gallery: [
      img("faire-part/recto.jpg", "Recto"),
      img("faire-part/carte-1.jpg", "Carte"),
      img("faire-part/presentation-1.jpg", "Présentation"),
    ],
  },
  {
    titre: "Jika — exposition d'un artiste",
    desc: "Affichette, carton d'invitation et post pour l'exposition d'un artiste reconnu, dans une salle d'exposition proche de moi.",
    tags: ["Affiche", "Événementiel", "Print"],
    bg: "radial-gradient(circle at 32% 28%, #EADFFF 0%, #B79BE8 38%, #7C63C8 68%, #2E2258 100%)",
    cover: img("jika/affichette-1.jpg", "Jika — affichette"),
    gallery: [
      img("jika/affichette-1.jpg", "Affichette"),
      img("jika/carton-1.jpg", "Carton d'invitation"),
      img("jika/post-1.jpg", "Post réseaux sociaux"),
    ],
  },
  {
    titre: "Office notarial du Duc — guide de marque",
    desc: "Guide de présentation complet d'une identité de marque pour un office notarial : concept, palette, typographie et applications.",
    tags: ["Identité de marque", "Branding", "Guide"],
    bg: "radial-gradient(circle at 32% 28%, #D8C88C 0%, #A8923E 38%, #6E5A1E 68%, #241C10 100%)",
    cover: img("office-notarial/guide-01.jpg", "Office notarial du Duc — guide"),
    gallery: [
      img("office-notarial/guide-01.jpg", "Concept"),
      img("office-notarial/guide-02.jpg", "Palette"),
      img("office-notarial/guide-03.jpg", "Typographie"),
      img("office-notarial/guide-04.jpg", "Applications"),
    ],
  },
  {
    titre: "Affiche — forme contre forme",
    desc: "Exercice d'illustration en forme contre forme : un crâne de cristal se dessine dans les reliefs d'une montagne, la pyramide devenant un nez. Une affiche pensée pour mettre en avant un film culte.",
    tags: ["Illustration", "Affiche", "Photoshop"],
    bg: "radial-gradient(circle at 32% 28%, #C8D8F0 0%, #8CA0C8 38%, #4E5E8A 68%, #1A2038 100%)",
    cover: img("boislard-affiche/affiche-1.jpg", "Affiche — forme contre forme"),
    gallery: [img("boislard-affiche/affiche-1.jpg", "Affiche")],
  },
  {
    titre: "Renault Twingo Électrique",
    desc: "Exercice publicitaire pour mettre en valeur la nouvelle Renault Twingo Électrique, décliné en mockups d'affichage urbain — métro et abribus.",
    tags: ["Publicité", "Mockup", "Automobile"],
    bg: "radial-gradient(circle at 32% 28%, #FFE870 0%, #F0C838 38%, #3E7AD8 68%, #142450 100%)",
    cover: img("renault/metro.jpg", "Renault Twingo — mockup métro"),
    gallery: [img("renault/metro.jpg", "Mockup métro"), img("renault/bus.jpg", "Mockup abribus")],
  },
  {
    titre: "Hobby Horse — championnat du monde insolite",
    desc: "Exercice de cours d'identité graphique autour d'un championnat du monde de sports insolites : le hobby-horsing.",
    tags: ["Identité de marque", "Affiche", "Exercice"],
    bg: "radial-gradient(circle at 32% 28%, #FFC0D0 0%, #E86E8E 38%, #A83E5C 68%, #3A1428 100%)",
    cover: img("hobby-horse/affiche-1.jpg", "Hobby Horse — affiche"),
    gallery: [img("hobby-horse/affiche-1.jpg", "Affiche")],
  },
  {
    titre: "No AI — Robia",
    desc: "Projet personnel né en pleine vague d'illustrations générées par IA envahissant les réseaux : un robot pris en flagrant délit de tag « No AI », éclairé de rouge et de bleu comme des gyrophares de police.",
    tags: ["Illustration", "Personnage", "Procreate"],
    bg: "radial-gradient(circle at 32% 28%, #FF9A9A 0%, #E85050 38%, #3E5EC8 68%, #14184A 100%)",
    cover: img("no-ai-robia/robia-1.jpg", "No AI — Robia"),
    gallery: [img("no-ai-robia/robia-1.jpg", "Robia")],
  },
  {
    titre: "Battle de logos",
    desc: "Une sélection d'entrées réalisées pour les battles de logos organisées par le graphiste et YouTuber Balo — des exercices rapides sur un brief imposé, dont « Souvenir d'une inconnue ».",
    tags: ["Logo", "Illustration", "Exercice"],
    bg: "radial-gradient(circle at 32% 28%, #FFD0F0 0%, #E88EDC 38%, #6E9EE8 68%, #F0D878 100%)",
    cover: img("bataille-de-logos/souvenir-1.jpg", "Battle de logos — souvenir d'une inconnue"),
    gallery: [
      img("bataille-de-logos/souvenir-1.jpg", "Souvenir d'une inconnue"),
      img("bataille-de-logos/olympos.jpg", "Olympos"),
      img("bataille-de-logos/universe-is-mine.jpg", "Universe is mine"),
      img("bataille-de-logos/bdl-118.jpg", "BDL 118"),
      img("bataille-de-logos/expspace.jpg", "Expspace"),
      img("bataille-de-logos/arizona-cafe.jpg", "Arizona café"),
      img("bataille-de-logos/chill.jpg", "Chill"),
      img("bataille-de-logos/bookinstamemphis.jpg", "Book in Sta Memphis"),
      img("bataille-de-logos/plan-4.jpg", "Plan de travail 4"),
      img("bataille-de-logos/plan-7.jpg", "Plan de travail 7"),
      img("bataille-de-logos/plan-12.jpg", "Plan de travail 12"),
      img("bataille-de-logos/plan-19.jpg", "Plan de travail 19"),
    ],
  },
  {
    titre: "Laura Twitch — emote",
    desc: "Création d'un emote personnalisé pour la chaîne Twitch de Laura.",
    tags: ["Illustration", "Personnage", "Twitch"],
    bg: "radial-gradient(circle at 32% 28%, #E0C8FF 0%, #A86EE8 38%, #6438A0 68%, #241450 100%)",
    cover: img("laura-twitch/emote-1.jpg", "Laura Twitch — emote"),
    gallery: [img("laura-twitch/emote-1.jpg", "Emote")],
  },
  {
    titre: "Nos amies lointaines",
    desc: "Visuels pour réseaux sociaux, déclinés en formats Instagram post et story.",
    tags: ["Réseaux sociaux", "Illustration"],
    bg: "radial-gradient(circle at 32% 28%, #FFD8E0 0%, #F09EB0 38%, #C86E88 68%, #4A2038 100%)",
    cover: img("nos-amies-lointaines/post.jpg", "Nos amies lointaines — post"),
    gallery: [img("nos-amies-lointaines/post.jpg", "Post"), img("nos-amies-lointaines/story.jpg", "Story")],
  },
];

export const navDefs = [
  { id: "accueil", href: "#accueil", title: "Un voyage en scroll" },
  { id: "apropos", href: "#apropos", title: "À propos" },
  { id: "escales", href: "#escales", title: "Escales — projets" },
  { id: "contact", href: "#contact", title: "Dernière halte — contact" },
] as const;

export const CONTACT_EMAIL = "studioplanere@gmail.com";
export const CONTACT_PHONE = "+33 6 40 41 13 48";
// Web3Forms access key from the handoff, tied to studioplanere@gmail.com /
// porte-folio-rosy.vercel.app — regenerate on web3forms.com if deploying to
// a different domain (see handoff README).
export const WEB3FORMS_ACCESS_KEY = "93f6d32a-6cb2-469d-908e-3214d136f98f";
