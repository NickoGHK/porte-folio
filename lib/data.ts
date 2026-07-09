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

const img = (src: string, alt?: string): MediaItem => ({ type: "image", src: `/assets/projects/${src}`, alt });
const vid = (src: string, poster: string): MediaItem => ({ type: "video", src: `/assets/projects/${src}`, poster: `/assets/projects/${poster}` });

export const projets = [
  {
    titre: "Boréale — identité de marque",
    desc: "Refonte complète d'une identité visuelle : logotype, packaging et déclinaisons print. Un système graphique inspiré des aurores, construit sous Illustrator.",
    tags: ["Identité", "Packaging", "Illustrator"],
    bg: "radial-gradient(circle at 32% 28%, #FFC894 0%, #FF9C74 38%, #C75E74 68%, #5C2A5E 100%)",
    cover: img("docklight-logo.png", "Boréale — logo"),
    gallery: [
      img("docklight-logo.png", "Boréale — logo"),
      img("docklight-mascotte.png", "Boréale — mascotte"),
      img("docklight-token.png", "Boréale — token"),
      img("docklight-forme.jpg", "Boréale — exploration de formes"),
    ],
  },
  {
    titre: "Atelier Racine — direction artistique",
    desc: "Direction artistique complète pour un collectif d'artisans : charte, supports print et signalétique, en écho au premier métier de Nicolas, le bois.",
    tags: ["Direction artistique", "Print", "Photoshop"],
    bg: "radial-gradient(circle at 32% 28%, #A8F0E8 0%, #5FC4BC 38%, #2E7A8A 68%, #1C3A5E 100%)",
    cover: img("branding-guide-01-cover.jpg", "Atelier Racine — couverture"),
    gallery: [
      img("branding-guide-01-cover.jpg", "Couverture"),
      img("branding-guide-02-concept.jpg", "Concept"),
      img("branding-guide-03-colors.jpg", "Palette"),
      img("branding-guide-04-badge.jpg", "Badge"),
      img("branding-guide-05-mockup.jpg", "Mockup"),
    ],
  },
  {
    titre: "Lumen — affiches de festival",
    desc: "Série d'affiches typographiques pour un festival de lumière : compositions grand format, jeux de dégradés et hiérarchies affirmées.",
    tags: ["Affiche", "Typographie", "InDesign"],
    bg: "radial-gradient(circle at 32% 28%, #EADFFF 0%, #B79BE8 38%, #7C63C8 68%, #3A2A6E 100%)",
    cover: img("jika-affichette.jpg", "Lumen — affichette"),
    gallery: [
      img("jika-affichette.jpg", "Affichette"),
      img("jika-cartinv.jpg", "Carte d'invitation"),
      img("jika-post-fv.jpg", "Post réseaux sociaux"),
    ],
  },
  {
    titre: "Éther — couvertures de saga",
    desc: "Couvertures et cartes illustrées pour une saga fantasy au long cours — le monde que Nicolas écrit et illustre sous Procreate.",
    tags: ["Illustration", "Procreate", "Worldbuilding"],
    bg: "radial-gradient(circle at 32% 28%, #FFB6C8 0%, #F07898 38%, #B04878 68%, #4A2050 100%)",
    cover: img("souvenir.jpg", "Éther — couverture"),
    gallery: [img("souvenir.jpg", "Couverture"), img("robia.jpg", "Personnage")],
  },
  {
    titre: "Nova — adaptation FR de webtoon",
    desc: "Traduction et lettrage d'un webtoon anglais : adaptation typographique des bulles, onomatopées redessinées, cohérence sur 40 épisodes.",
    tags: ["Lettrage", "Traduction", "Édition"],
    bg: "radial-gradient(circle at 32% 28%, #A8C8FF 0%, #6E92E8 38%, #4A5EC0 68%, #22285E 100%)",
    cover: img("laura-emote.jpg", "Nova — planche"),
    gallery: [img("laura-emote.jpg", "Planche lettrée")],
  },
  {
    titre: "Dérives — série générative",
    desc: "Recherche visuelle mêlant IA générative et retouche : une série d'images oniriques, curatée et retravaillée image par image, plus un teaser vidéo du processus.",
    tags: ["IA générative", "Recherche", "Figma"],
    bg: "radial-gradient(circle at 32% 28%, #FFE2A0 0%, #F0B860 38%, #C07840 68%, #5E3A28 100%)",
    cover: vid("teaser-compressed.mp4", "teaser-poster.jpg"),
    gallery: [
      vid("teaser-compressed.mp4", "teaser-poster.jpg"),
      img("nos-amies-p.jpg", "Série — post"),
      img("nos-amies-s.jpg", "Série — story"),
    ],
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
