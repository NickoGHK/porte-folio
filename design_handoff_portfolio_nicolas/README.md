# Handoff : Portfolio Nicolas Boislard — "Voyage en scroll"

## Overview
Portfolio one-page narratif et spatial pour Nicolas Boislard, graphiste. Le visiteur traverse une scène spatiale illustrée en scrollant verticalement : chaque section est un "arrêt" du voyage (accueil, à propos, escales/projets, contact), avec parallaxe marqué, une fusée qui anime la transition entre sections, planètes cliquables, formulaire de contact fonctionnel et lecteur audio d'ambiance.

## About the Design Files
Les fichiers de ce dossier sont des **références de design créées en HTML** (prototype fonctionnel) — pas du code à copier tel quel dans un projet de production. La tâche est de **recréer ce design dans l'environnement du projet cible** (React, Vue, Next.js, ou autre stack déjà en place) en suivant ses conventions existantes — ou, si aucun projet n'existe encore, de choisir le framework le plus adapté (probablement Next.js/React pour du déploiement Vercel) et d'implémenter le design dedans.

Le prototype tourne sur un runtime interne ("Design Component" + `support.js`) qui ne doit **pas** être repris — il sert uniquement de référence vivante pour rejouer fidèlement structure, styles inline, logique d'état et animations dans du code standard (composants React classiques, CSS/JS natif, etc.).

## Fidelity
**Haute fidélité (hifi)** — couleurs, typographies, espacements, textes et interactions sont définitifs. Le développeur doit recréer l'UI au pixel près avec les librairies/patterns du projet cible.

## Screens / Views (sections du one-page, dans l'ordre du scroll)

### 1. Accueil — "Un voyage en scroll" (`#accueil`)
- Section plein écran (`height: 100vh; min-height: 800px; overflow: hidden`)
- Fond : dégradé vertical violet nuit `linear-gradient(180deg, #0A0620 0%, #0B0621 10%, #0E0926 25%, #170E34 50%, #201442 75%, #231647 90%, #241648 100%)`
- Couches en parallaxe (attribut `data-parallax` = vitesse relative au scroll, ex. `-0.3`, `-0.6`) : champ d'étoiles scintillantes, une maison illustrée, une fusée "héros" statique au repos
- Texte titre "Nicolas Boislard" + accroche "Graphiste" en haut à gauche (police Bricolage Grotesque, ~poids 720)
- La fusée de cette section est le point de départ de l'animation de trajet (voir Interactions)

### 2. À propos (`#apropos`, id interne "1c")
- Fond dégradé continu avec la section précédente (violet → variantes)
- Planète principale "à propos" + anneau (l'anneau doit toujours passer **derrière** la planète, jamais devant) + petites lunes satellites en orbite réelle le long de trajectoires en pointillés
- 4 "lunes" cliquables autour de la planète, chacune une pastille dégradée ronde (54px) avec un libellé en majuscules dessous (police JetBrains Mono, 14px, letter-spacing 0.1em, couleur `#C9BCF2`) : À PROPOS, MES DIPLÔMES, MES PASSIONS, MES OUTILS
- Clic sur une lune → affiche sous le texte principal un contenu contextuel :
  - **À propos** : paragraphes de bio (parcours pro)
  - **Mes diplômes** : petite frise/timeline verticale du parcours (Bac pro → BTS → intérim → Bachelor)
  - **Mes passions** : grille de tuiles icônes (Musique, Lecture & écriture, Peinture & dessin, Jeu vidéo) — chaque tuile a un fond coloré propre et une icône SVG interne (voir Assets)
  - **Mes outils** : grille d'icônes logiciels (Photoshop, Illustrator, InDesign, Figma, Procreate, Claude) avec monogramme + logo réel en overlay pour Figma/Procreate/Claude
- La fusée traverse cette section en trajectoire courbe (Bézier) qui **ne passe jamais devant un élément cliquable** (planète/lunes) — elle entre en haut à droite, passe au-dessus de la maison, sous la planète à propos, sous le texte, et ressort à gauche

### 3. Escales — projets (`#escales`, id interne "1b")
- Zone d'affichage de visuel de projet en bas de la scène + bouton de défilement pour naviguer horizontalement entre 4–6 projets (identité, packaging, illustration, etc.)
- Un clic sur le bouton avance à l'escale/projet suivant ; le texte (titre + description courte) change sans que la mise en page globale ne bouge

### 4. Contact — dernière halte (`#contact`, id interne "2a")
- Ambiance "feu de camp" façon Outer Wilds : flammes vacillantes, lueur pulsante, étincelles montantes, fumée légère
- Panneau "console de bord" (style tableau de bord/instrument, pas un simple panneau plat) avec :
  - Titre "Dernière halte, rejoins-moi" (taille réduite par rapport à la version initiale)
  - Champs Nom / Email / Message (fond sombre translucide, bordure violette `#4A3A8E`, focus → bordure orange `#FFB37A` + glow)
  - Bouton "Transmettre →" (dégradé orange `linear-gradient(120deg, #FFB37A, #FF8E6E)`, ombre portée façon touche 3D, glow au survol)
  - Voyants lumineux qui pulsent (rouge/orange/vert), curseur clignotant, effet de frappe caractère par caractère sur le texte d'accroche
  - Email de contact affiché : `studioplanere@gmail.com`

### Boucle finale
En fin de scroll, la scène reboucle visuellement vers l'ambiance d'ouverture (même palette / éléments similaires) pour suggérer un voyage circulaire infini.

### Navigation (fixe, persistante)
Colonne de points à droite de l'écran (un par section). Le point de la section active grossit légèrement (`scale(1.35)`), affiche une micro-planète scintillante à l'intérieur (dégradé radial orange, animation `navtwinkle`) entourée d'un anneau pointillé qui tourne en continu (`navringspin`, 5s linéaire).

## Interactions & Behavior
- **Scroll-driven parallax** : chaque couche a un facteur `data-parallax` ; recalcul en boucle `requestAnimationFrame` en fonction de `window.scrollY`/position de chaque section.
- **Détection de section active** : à chaque frame, on teste quelle section couvre le milieu de la fenêtre (`getBoundingClientRect`) pour mettre à jour la nav.
- **Fusée animée** : trajectoire définie par une série de points de contrôle (courbe de Bézier) interpolés selon la progression de scroll dans la section 2 ; rotation de la fusée suit la tangente de la courbe (le nez toujours dans le sens du mouvement).
- **Lunes cliquables** : `onClick` bascule un état (`ap` : quel panneau afficher) — un seul panneau visible à la fois sous le texte "à propos".
- **Bouton "défilement projets"** : avance l'index du projet affiché (état `idx`), boucle après le dernier.
- **Formulaire de contact** : contrôlé (inputs liés à `contactNom` / `contactEmail` / `contactMessage`). Au clic sur "Transmettre" :
  - Envoi `POST` vers `https://api.web3forms.com/submit` avec `access_key`, `subject`, `name`, `email`, `message` (JSON, `Accept: application/json`)
  - Si succès → affiche un état de confirmation ("SIGNAL TRANSMIS")
  - Si échec réseau → repli sur un lien `mailto:studioplanere@gmail.com` pré-rempli (ouvre le client mail du visiteur)
  - Bouton passe en opacité réduite + libellé "Transmission…" pendant l'envoi
- **Lecteur audio d'ambiance** : contrôle discret (icône haut-parleur + jauge horizontale façon trajectoire orbitale, curseur = mini planète). Chargement du MP3 différé (lazy), déclenché seulement à la première interaction avec le contrôle (respect des règles autoplay des navigateurs).
- **Animations d'ambiance en boucle** (CSS `@keyframes`, voir liste dans `<helmet><style>` du fichier HTML) : scintillement d'étoiles asynchrone, flottement (`floaty`), flammes (`flame`), fumée (`smoke`), respiration de combinaison spatiale (`breathe`), mouvement de bras (`armbob`), voyants lumineux (`ledpulse`), curseur clignotant (`blinkcursor`), étincelles (`spark`), halo de propulsion (`glowpulse`), orbites de satellites (`orbitspin`, `orbitspin2`).
- **Grain/bruit subtil** sur les fonds unis : calque SVG `feTurbulence` en overlay à très faible opacité (~0.07), activable/désactivable via une prop.

## State Management
États principaux (composant unique dans le prototype) :
- `idx` : index du projet/escale affiché
- `rot` : rotation courante utilisée pour certaines animations
- `ap` : quel panneau "à propos" est affiché (à propos / diplômes / passions / outils)
- `activeSection` : id de la section actuellement au centre du viewport (pilote la nav à points)
- `envoye`, `envoiEnCours`, `envoiErreur` : cycle de vie de l'envoi du formulaire de contact
- `contactNom`, `contactEmail`, `contactMessage` : valeurs contrôlées du formulaire
- `typed` : texte affiché progressivement (effet machine à écrire) pour l'accroche de la section contact
- `vol`, `muet` : volume et mute du lecteur audio

Pas de données serveur/API à part l'envoi du formulaire (Web3Forms).

## Design Tokens

### Couleurs
- Fond violet nuit (dégradé principal) : `#0A0620` → `#0B0621` → `#0E0926` → `#170E34` → `#201442` → `#231647` → `#241648`
- Texte clair : `#F6F1FF`, `#C9BCF2`
- Accent orange/corail (CTA, fusée, glows) : `#FFB37A`, `#FF8E6E`, `#FFD9A0`
- Ombre portée bouton : `#B5543E`
- Bordures panneaux : `#4A3A8E`
- Icône passions — Musique : fond `#33210F`, icône `#E3A85C`
- Icône passions — Lecture & écriture : fond `#C86A34`, icône `#F2D8AE`
- Icône passions — Peinture & dessin : fond `#3D5FA8`, icône `#BBD3FA`
- Icône passions — Jeu vidéo : fond `#2E8F82`, icône `#B0F5E8`
- Icônes outils : Photoshop fond noir/bleu, Illustrator `#330000`/`#FF9A00`, InDesign `#49021F`/`#FF3366`, Figma `#1E1E2E`/`#A259FF`, Procreate noir/`#9FE8E4`, Claude `#1F1E1B`/`#D97757`

### Typographie
- Titres : **Bricolage Grotesque** (poids ~300–800, utilisé autour de 700–720 pour les titres)
- Corps de texte : **Manrope** (400–700)
- Éléments "techniques"/console (labels, formulaire, UI système) : **JetBrains Mono** (400–500), souvent en majuscules avec `letter-spacing: 0.06em–0.1em`
- Chargées via Google Fonts (`fonts.googleapis.com`)

### Rayons / ombres
- Boutons/inputs : `border-radius: 8px`
- Bouton CTA : ombre "touche" `box-shadow: 0 4px 0 #B5543E`, s'aplatit à `0 1px 0` au clic (`translateY(3px)`)
- Focus champs : `box-shadow: 0 0 14px rgba(255,179,122,0.25)`

### Échelle / structure
- Scène centrée sur un canevas fixe de **1440px de large** (`position: absolute; left: 50%; transform: translateX(-50%); width: 1440px`) — le design n'est pas responsive fluide, il est pensé comme une scène fixe centrée à l'intérieur de sections `100vh`.
- Chaque section : `height: 100vh` avec un `min-height` (800–900px selon section) et `overflow: hidden`.

## Assets
Dossier `assets/` inclus dans ce handoff :
- `ambiance.mp3` — musique de fond (chargement différé)
- `musique.svg`, `lecture-ecriture.svg`, `peinture-dessin.svg`, `jeuxvideo.svg` — icônes de la section "Mes passions" (couleurs intégrées dans le SVG, ne pas les recolorer par CSS)
- `figma.svg`, `procreate.svg`, `claude.svg` — logos officiels utilisés dans la grille "Mes outils"

Les icônes Photoshop/Illustrator/InDesign sont des monogrammes texte stylés inline (pas de fichier séparé) — voir le tableau `outils` dans le fichier HTML pour les couleurs exactes par outil.

## Files
- `screenshots/` — captures des 4 sections (accueil, à propos, escales, contact) pour référence visuelle rapide.
- `Site Portfolio One Page.dc.html` — fichier source complet du design (structure + styles inline + logique d'état + animations). C'est la référence principale à consulter pour toute mesure, couleur ou comportement non couverte ci-dessus.
- `support.js` — runtime du prototype interne, **à ne pas reprendre** dans le projet cible (sert uniquement à faire tourner le fichier `.dc.html` tel quel dans un navigateur pour consultation).
- `assets/` — voir ci-dessus.

## Note sur le formulaire de contact
La clé Web3Forms utilisée dans le prototype est liée à `studioplanere@gmail.com` et au domaine `porte-folio-rosy.vercel.app`. Si le développeur déploie sur un autre domaine, il faudra soit mettre à jour le domaine autorisé dans le compte Web3Forms, soit générer une nouvelle clé.
