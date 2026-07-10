"use client";

import { useEffect, useState } from "react";
import StarField from "@/components/StarField";
import BlurReveal from "@/components/BlurReveal";
import { CONTACT_EMAIL, CONTACT_PHONE, WEB3FORMS_ACCESS_KEY } from "@/lib/data";

const TYPED_FULL = "Posons-nous, parlons-en.";

export default function Contact() {
  const [typed, setTyped] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [envoye, setEnvoye] = useState(false);
  const [envoiEnCours, setEnvoiEnCours] = useState(false);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(TYPED_FULL.slice(0, i));
      if (i >= TYPED_FULL.length) clearInterval(id);
    }, 65);
    return () => clearInterval(id);
  }, []);

  const envoyerSignal = async () => {
    if (envoiEnCours) return;
    const nomEnvoi = nom || "(non renseigné)";
    const emailEnvoi = email || "(non renseigné)";
    const messageEnvoi = message || "(vide)";
    setEnvoiEnCours(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "Nouveau message depuis le portfolio — " + nomEnvoi,
          from_name: nomEnvoi,
          name: nomEnvoi,
          email: emailEnvoi,
          message: messageEnvoi,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEnvoye(true);
        setEnvoiEnCours(false);
      } else {
        throw new Error(data.message || "échec");
      }
    } catch {
      const sujet = "Nouveau message depuis le portfolio — " + nomEnvoi;
      const corps = "Nom : " + nomEnvoi + "\nEmail : " + emailEnvoi + "\n\nMessage :\n" + messageEnvoi;
      const lien = "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent(sujet) + "&body=" + encodeURIComponent(corps);
      window.location.href = lien;
      setEnvoiEnCours(false);
      setEnvoye(true);
    }
  };

  return (
    <section
      id="contact"
      data-scene="contact"
      className="scene-section"
      style={{
        position: "relative",
        height: "100vh",
        minHeight: 900,
        overflow: "hidden",
        background:
          "linear-gradient(180deg, #140C2C 0%, #150C2D 10%, #170E32 25%, #1F113E 50%, #27144A 75%, #29164F 90%, #2A1650 100%)",
      }}
    >
      <div data-parallax="-0.3" style={{ position: "absolute", left: 0, right: 0, top: -340, bottom: -340 }}>
        <StarField seed={1357913} />
      </div>

      {/* planète bleue à l'horizon — data-parallax gère le scroll, l'animation
          flottante CSS garde le bobbing sur sa propre couche. À l'intérieur,
          l'anneau (arrière, avant) et le corps ont chacun leur propre
          vélocité de souris pour un vrai effet de profondeur — l'anneau
          reste scindé en deux moitiés pour l'illusion "devant/derrière la
          planète", chaque moitié héritant de la même vélocité "anneau". */}
      <div data-parallax="-0.15" style={{ position: "absolute", right: "8vw", top: 60, width: 250, height: 250 }}>
        <div style={{ position: "absolute", inset: 0, animation: "floaty 12s ease-in-out infinite" }}>
          {/* moitié arrière de l'anneau + halo */}
          <div data-mouse-parallax="0.032" style={{ position: "absolute", inset: 0 }}>
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 380,
                height: 90,
                border: "2.5px solid rgba(201, 188, 242, 0.4)",
                borderRadius: "50%",
                transform: "translate(-50%, -50%) rotate(-14deg)",
                clipPath: "inset(0 0 50% 0)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: -7,
                borderRadius: "50%",
                border: "5px solid rgba(159, 214, 255, 0.22)",
                filter: "blur(6px)",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* corps de la planète */}
          <div data-mouse-parallax="0.014" style={{ position: "absolute", inset: 0 }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                overflow: "hidden",
                boxShadow: "0 0 90px rgba(110, 146, 232, 0.3)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(circle at 34% 30%, #A8C8FF 0%, #6E92E8 45%, #2A3A8E 100%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "-6%",
                  top: "26%",
                  width: 200,
                  height: 22,
                  borderRadius: 999,
                  background: "rgba(255, 255, 255, 0.18)",
                  filter: "blur(1.5px)",
                  animation: "banddrift 14s ease-in-out infinite",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "24%",
                  top: "52%",
                  width: 190,
                  height: 18,
                  borderRadius: 999,
                  background: "rgba(20, 24, 80, 0.28)",
                  filter: "blur(1.5px)",
                  animation: "banddrift 18s ease-in-out 3s infinite reverse",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "60%",
                  top: "16%",
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: "rgba(20, 24, 80, 0.22)",
                  boxShadow: "inset 2px 2px 4px rgba(8, 10, 40, 0.5)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(circle at 34% 30%, transparent 42%, rgba(6, 8, 34, 0.55) 90%)",
                }}
              />
            </div>
          </div>

          {/* moitié avant de l'anneau — passe devant la planète */}
          <div data-mouse-parallax="0.032" style={{ position: "absolute", inset: 0, zIndex: 1 }}>
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 380,
                height: 90,
                border: "2.5px solid rgba(201, 188, 242, 0.4)",
                borderRadius: "50%",
                transform: "translate(-50%, -50%) rotate(-14deg)",
                clipPath: "inset(50% 0 0 0)",
              }}
            />
          </div>
        </div>
      </div>

      {/* sol : planète courbe pleine largeur */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: -2620,
          transform: "translateX(-50%)",
          width: 3400,
          height: 3400,
          borderRadius: "50%",
          background: "radial-gradient(circle at 50% 12%, #3A2A6E 0%, #241A52 35%, #150F38 100%)",
        }}
      />

      <div className="stage-desktop stage-scale-bottom" style={{ position: "absolute", left: "50%", bottom: 0, width: 1440, height: 900 }}>
        {/* cratères */}
        <div style={{ position: "absolute", left: 240, bottom: 120, width: 90, height: 26, borderRadius: "50%", background: "rgba(12, 8, 34, 0.5)" }} />
        <div style={{ position: "absolute", left: 982, bottom: 149, width: 60, height: 18, borderRadius: "50%", background: "rgba(12, 8, 34, 0.45)" }} />

        {/* halo du feu */}
        <div
          style={{
            position: "absolute",
            left: 432,
            top: 442,
            width: 640,
            height: 420,
            background: "radial-gradient(closest-side, rgba(255, 179, 122, 0.28), rgba(255, 142, 110, 0.08) 55%, transparent 75%)",
            animation: "glowpulse 2.8s ease-in-out infinite",
          }}
        >
          <div style={{ position: "absolute", left: 314, top: 111, width: 10, height: 10, borderRadius: "50%", background: "rgba(201, 188, 242, 0.4)", animation: "smoke 3.2s ease-out infinite" }} />
          <div style={{ position: "absolute", left: 318, top: 96, width: 14, height: 14, borderRadius: "50%", background: "rgba(201, 188, 242, 0.4)", animation: "smoke 4s ease-out infinite" }} />
          <div style={{ position: "absolute", left: 319, top: 81, width: 10, height: 10, borderRadius: "50%", background: "rgba(201, 188, 242, 0.32)", animation: "smoke 4s ease-out 1.4s infinite" }} />
        </div>

        {/* fusée posée */}
        <div style={{ position: "absolute", left: 990, bottom: 300 }}>
          <div style={{ position: "absolute", left: -16, bottom: -14, width: 110, height: 20, borderRadius: "50%", background: "rgba(8, 5, 24, 0.5)", filter: "blur(4px)" }} />
          <div style={{ position: "relative", width: 64, height: 150, transform: "rotate(6deg)" }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "32px 32px 16px 16px",
                background: "linear-gradient(160deg, #F8F2FF 0%, #D9CCF6 55%, #A995E4 100%)",
                boxShadow:
                  "inset -7px -5px 14px -5px rgba(58, 42, 110, 0.5), inset 6px 5px 10px -4px rgba(255, 255, 255, 0.7), inset 0 -20px 24px -18px rgba(255, 142, 110, 0.55)",
              }}
            />
            <div style={{ position: "absolute", left: 8, top: 14, width: 6, height: 104, borderRadius: 3, background: "linear-gradient(180deg, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.04))" }} />
            <div style={{ position: "absolute", left: "50%", top: 30, transform: "translateX(-50%)", width: 28, height: 28, borderRadius: "50%", background: "#241A52", border: "4px solid #FFD9A0" }} />
            <div style={{ position: "absolute", left: 34, top: 37, width: 8, height: 5, borderRadius: "50%", background: "rgba(255, 255, 255, 0.75)", transform: "rotate(-24deg)" }} />
            <div style={{ position: "absolute", left: -18, bottom: 2, width: 22, height: 44, background: "#FF8E6E", clipPath: "polygon(100% 0%, 100% 100%, 0% 100%)", borderRadius: 4 }} />
            <div style={{ position: "absolute", right: -18, bottom: 2, width: 22, height: 44, background: "#FF8E6E", clipPath: "polygon(0% 0%, 0% 100%, 100% 100%)", borderRadius: 4 }} />
          </div>
        </div>

        {/* feu de camp */}
        <div style={{ position: "absolute", left: 700, bottom: 268 }}>
          <div style={{ position: "absolute", left: -34, bottom: -6, width: 80, height: 14, borderRadius: 7, background: "#5C3A28", transform: "rotate(18deg)" }} />
          <div style={{ position: "absolute", left: -40, bottom: -8, width: 80, height: 14, borderRadius: 7, background: "#4A2E20", transform: "rotate(-16deg)" }} />
          <div
            style={{
              position: "absolute",
              left: "50%",
              bottom: 2,
              width: 44,
              height: 74,
              background: "linear-gradient(180deg, #FFD9A0 0%, #FF8E6E 70%, #E85A4E 100%)",
              clipPath: "polygon(50% 0%, 12% 62%, 22% 100%, 78% 100%, 88% 62%)",
              borderRadius: 6,
              transformOrigin: "bottom center",
              animation: "flame 0.9s ease-in-out infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "50%",
              bottom: 2,
              width: 24,
              height: 44,
              background: "linear-gradient(180deg, #FFF3D6 0%, #FFD9A0 100%)",
              clipPath: "polygon(50% 0%, 16% 64%, 26% 100%, 74% 100%, 84% 64%)",
              borderRadius: 4,
              transformOrigin: "bottom center",
              animation: "flame 0.7s ease-in-out 0.2s infinite",
            }}
          />
          <div style={{ position: "absolute", left: 4, bottom: 82, width: 5, height: 5, borderRadius: "50%", background: "#FFD9A0", animation: "twinkle 1.8s ease-in-out infinite" }} />
          <div style={{ position: "absolute", left: 26, bottom: 108, width: 4, height: 4, borderRadius: "50%", background: "#FF8E6E", animation: "twinkle 2.4s ease-in-out 0.6s infinite" }} />
          <div style={{ position: "absolute", left: -14, bottom: 128, width: 3, height: 3, borderRadius: "50%", background: "#FFD9A0", animation: "twinkle 2s ease-in-out 1.1s infinite" }} />
          <div style={{ position: "absolute", left: 8, bottom: 70, width: 4, height: 4, borderRadius: "50%", background: "#FFD9A0", animation: "spark 2.6s ease-out infinite" }} />
          <div style={{ position: "absolute", left: 18, bottom: 76, width: 3, height: 3, borderRadius: "50%", background: "#FF8E6E", animation: "spark 3.4s ease-out 1.2s infinite" }} />
          <div style={{ position: "absolute", left: -2, bottom: 74, width: 3, height: 3, borderRadius: "50%", background: "#FFF3D6", animation: "spark 3s ease-out 2s infinite" }} />
          <div style={{ position: "absolute", left: 2, bottom: 90, width: 8, height: 8, borderRadius: "50%", background: "rgba(201, 188, 242, 0.3)", animation: "smoke 4s ease-out 2.6s infinite" }} />
        </div>

        {/* le pilote assis face au feu */}
        <div style={{ position: "absolute", left: 800, bottom: 250, width: 150, height: 170 }}>
          <div style={{ position: "absolute", left: 28, bottom: 0, width: 110, height: 24, borderRadius: 12, background: "linear-gradient(180deg, #5C3A28, #3E2413)" }} />
          <div style={{ position: "absolute", left: 130, bottom: 2, width: 14, height: 20, borderRadius: "50%", background: "#8A5A38", border: "3px solid #4A2E20" }} />
          <div style={{ position: "absolute", left: 26, bottom: 24, width: 44, height: 15, borderRadius: 8, background: "#A8404E", transform: "rotate(6deg)" }} />
          <div style={{ position: "absolute", left: 20, bottom: 4, width: 14, height: 26, borderRadius: 7, background: "#A8404E" }} />
          <div style={{ position: "absolute", left: 8, bottom: 2, width: 30, height: 12, borderRadius: "8px 6px 4px 8px", background: "#2A1650" }} />
          <div style={{ position: "absolute", left: 30, bottom: 30, width: 48, height: 16, borderRadius: 9, background: "linear-gradient(90deg, #E8734F, #C75E74)", transform: "rotate(4deg)" }} />
          <div style={{ position: "absolute", left: 28, bottom: 8, width: 15, height: 30, borderRadius: 8, background: "linear-gradient(180deg, #E8734F, #C75E74)" }} />
          <div style={{ position: "absolute", left: 14, bottom: 6, width: 34, height: 13, borderRadius: "9px 6px 4px 9px", background: "#34266E" }} />
          <div style={{ position: "absolute", left: 104, bottom: 42, width: 30, height: 52, borderRadius: 10, background: "linear-gradient(200deg, #6D5FAE, #34266E)" }} />
          <div style={{ position: "absolute", left: 110, bottom: 96, width: 3, height: 22, background: "#C9BCF2", borderRadius: 2 }} />
          <div style={{ position: "absolute", left: 108, bottom: 116, width: 7, height: 7, borderRadius: "50%", background: "#FFD9A0", animation: "twinkle 2.6s ease-in-out infinite" }} />
          <div
            style={{
              position: "absolute",
              left: 58,
              bottom: 26,
              width: 52,
              height: 66,
              borderRadius: "24px 22px 10px 12px",
              background: "linear-gradient(255deg, #C75E74 15%, #E8734F 60%, #FF9C74 95%)",
              transform: "rotate(8deg)",
              transformOrigin: "bottom center",
              boxShadow: "inset 5px -2px 10px -4px rgba(255, 217, 160, 0.5), inset -4px 3px 8px -3px rgba(74, 32, 80, 0.45)",
              animation: "breathe 4.2s ease-in-out infinite",
            }}
          />
          <div style={{ position: "absolute", left: 60, bottom: 34, width: 48, height: 8, borderRadius: 4, background: "#4A2050", transform: "rotate(8deg)" }} />
          <div
            style={{
              position: "absolute",
              left: 52,
              bottom: 86,
              width: 46,
              height: 46,
              borderRadius: "50%",
              background: "radial-gradient(circle at 40% 32%, #F8F2FF, #C9BCF2 70%, #A995E4)",
              boxShadow: "inset 4px -3px 8px -2px rgba(255, 179, 122, 0.55)",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", left: -4, top: 9, width: 32, height: 28, borderRadius: 16, background: "linear-gradient(250deg, #241A52 30%, #3A2A6E 80%)" }} />
            <div style={{ position: "absolute", left: 2, top: 14, width: 9, height: 6, borderRadius: 3, background: "rgba(255, 217, 160, 0.85)", transform: "rotate(-18deg)" }} />
            <div style={{ position: "absolute", left: 14, top: 22, width: 5, height: 4, borderRadius: 2, background: "rgba(255, 142, 110, 0.7)", transform: "rotate(-14deg)" }} />
            <div style={{ position: "absolute", right: 5, top: 5, width: 13, height: 7, borderRadius: "50%", background: "rgba(255, 255, 255, 0.6)", transform: "rotate(26deg)" }} />
          </div>
          <div style={{ position: "absolute", left: 92, bottom: 128, width: 2.5, height: 16, background: "#C9BCF2", transform: "rotate(14deg)" }} />
          <div style={{ position: "absolute", left: 94, bottom: 143, width: 6, height: 6, borderRadius: "50%", background: "#FF8E6E", animation: "twinkle 1.9s ease-in-out 0.4s infinite" }} />
          <div style={{ position: "absolute", left: 28, bottom: 58, width: 42, height: 13, transform: "rotate(18deg)", transformOrigin: "right center", animation: "armbob 3.2s ease-in-out infinite" }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 7, background: "linear-gradient(90deg, #FF9C74, #E8734F)" }} />
            <div style={{ position: "absolute", left: -70, top: 4, width: 80, height: 3.5, borderRadius: 2, background: "#8A5A38", transform: "rotate(9deg)", transformOrigin: "right center" }}>
              <div style={{ position: "absolute", left: -8, top: -5, width: 15, height: 12, borderRadius: 5, background: "linear-gradient(220deg, #FFF3D6 40%, #E2A878)", boxShadow: "inset -2px -2px 3px rgba(154, 90, 56, 0.4)" }}>
                <div style={{ position: "absolute", left: 4, top: -3, width: 7, height: 7, borderRadius: "50%", background: "rgba(201, 188, 242, 0.35)", animation: "smoke 3.2s ease-out 1.1s infinite" }} />
              </div>
            </div>
            <div style={{ position: "absolute", left: -9, top: -1, width: 15, height: 15, borderRadius: "50%", background: "#34266E" }} />
          </div>
        </div>

        {/* console de la fusée : formulaire de contact */}
        <div style={{ position: "absolute", left: 130, bottom: 78, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              position: "relative",
              width: 440,
              borderRadius: "18px 18px 12px 12px",
              background: "linear-gradient(180deg, #3A2F6E 0%, #241A52 60%, #1A1240 100%)",
              border: "3px solid #6D5FAE",
              boxShadow: "0 18px 50px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(201, 188, 242, 0.35)",
              padding: "20px 26px 22px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ position: "absolute", left: 10, top: 10, width: 7, height: 7, borderRadius: "50%", background: "#8F84C4" }} />
            <div style={{ position: "absolute", right: 10, top: 10, width: 7, height: 7, borderRadius: "50%", background: "#8F84C4" }} />
            <div style={{ position: "absolute", left: 10, bottom: 10, width: 7, height: 7, borderRadius: "50%", background: "#8F84C4" }} />
            <div style={{ position: "absolute", right: 10, bottom: 10, width: 7, height: 7, borderRadius: "50%", background: "#8F84C4" }} />

            <div style={{ display: "flex", alignItems: "center", gap: 10, borderBottom: "2px solid rgba(109, 95, 174, 0.4)", paddingBottom: 10 }}>
              <div style={{ display: "flex", gap: 6 }}>
                <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#FF8E6E", boxShadow: "0 0 6px rgba(255, 142, 110, 0.8)", animation: "ledpulse 2.2s ease-in-out infinite" }} />
                <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#FFD9A0", boxShadow: "0 0 6px rgba(255, 217, 160, 0.8)", animation: "ledpulse 1.6s ease-in-out 0.4s infinite" }} />
                <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#9FE8E4", boxShadow: "0 0 6px rgba(159, 232, 228, 0.8)", animation: "ledpulse 2.8s ease-in-out 0.9s infinite" }} />
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9BCF2" }}>
                console — transmission
              </div>
            </div>

            <div style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 720, lineHeight: 1.05, color: "#F6F1FF", minHeight: 28 }}>
              {typed}
              <span
                style={{
                  display: "inline-block",
                  width: 3,
                  height: 20,
                  background: "#FFB37A",
                  marginLeft: 5,
                  verticalAlign: -2,
                  animation: "blinkcursor 1.1s steps(1) infinite",
                }}
              />
            </div>

            {!envoye ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                <input
                  placeholder="VOTRE NOM"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="contact-input"
                  style={{
                    border: "2px solid #4A3A8E",
                    borderRadius: 8,
                    background: "rgba(8, 6, 24, 0.7)",
                    color: "#F6F1FF",
                    fontFamily: "var(--font-mono)",
                    fontSize: 14,
                    letterSpacing: "0.06em",
                    padding: "11px 14px",
                    outline: "none",
                  }}
                />
                <input
                  placeholder="VOTRE EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="contact-input"
                  style={{
                    border: "2px solid #4A3A8E",
                    borderRadius: 8,
                    background: "rgba(8, 6, 24, 0.7)",
                    color: "#F6F1FF",
                    fontFamily: "var(--font-mono)",
                    fontSize: 14,
                    letterSpacing: "0.06em",
                    padding: "11px 14px",
                    outline: "none",
                  }}
                />
                <textarea
                  placeholder="VOTRE MESSAGE…"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="contact-input"
                  style={{
                    border: "2px solid #4A3A8E",
                    borderRadius: 8,
                    background: "rgba(8, 6, 24, 0.7)",
                    color: "#F6F1FF",
                    fontFamily: "var(--font-mono)",
                    fontSize: 14,
                    letterSpacing: "0.06em",
                    padding: "11px 14px",
                    outline: "none",
                    resize: "none",
                  }}
                />
                <div
                  onClick={envoyerSignal}
                  className="contact-submit"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    background: "linear-gradient(120deg, #FFB37A, #FF8E6E)",
                    color: "#2A1004",
                    fontFamily: "var(--font-mono)",
                    fontSize: 15,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    borderRadius: 8,
                    padding: "13px 20px",
                    cursor: "pointer",
                    userSelect: "none",
                    boxShadow: "0 4px 0 #B5543E",
                    opacity: envoiEnCours ? 0.6 : 1,
                  }}
                >
                  {envoiEnCours ? "Transmission…" : "Transmettre →"}
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "14px 0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#FFD9A0", fontFamily: "var(--font-mono)", fontSize: 17, fontWeight: 700, letterSpacing: "0.08em" }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FFB37A", animation: "orbitpulse 2s ease-out infinite" }} />
                  SIGNAL TRANSMIS
                </div>
                <div style={{ fontSize: 15, lineHeight: 1.6, color: "#B9AEDC" }}>
                  Votre message voyage vers la station. Réponse sous 48 h, temps terrestre.
                </div>
              </div>
            )}

            <div style={{ display: "flex", alignItems: "center", gap: 10, borderTop: "2px solid rgba(109, 95, 174, 0.4)", paddingTop: 10 }}>
              <a href={`mailto:${CONTACT_EMAIL}`} className="contact-link" style={{ color: "#C9BCF2", fontFamily: "var(--font-mono)", fontSize: 12.5, textDecoration: "none" }}>
                {CONTACT_EMAIL}
              </a>
              <span style={{ color: "rgba(201, 188, 242, 0.4)" }}>•</span>
              <a href={`tel:${CONTACT_PHONE.replace(/\s+/g, "")}`} className="contact-link" style={{ color: "#C9BCF2", fontFamily: "var(--font-mono)", fontSize: 12.5, textDecoration: "none" }}>
                {CONTACT_PHONE}
              </a>
            </div>
          </div>

          <div style={{ display: "flex", gap: 240, marginTop: -2 }}>
            <div style={{ width: 14, height: 34, background: "linear-gradient(180deg, #4A3A8E, #241A52)", borderRadius: 3, transform: "skewX(10deg)" }} />
            <div style={{ width: 14, height: 34, background: "linear-gradient(180deg, #4A3A8E, #241A52)", borderRadius: 3, transform: "skewX(-10deg)" }} />
          </div>
        </div>

        {/* titre de la scène */}
        <div style={{ position: "absolute", left: 130, top: 96, display: "flex", flexDirection: "column", gap: 12, maxWidth: 560 }}>
          <BlurReveal
            as="div"
            text="DERNIÈRE HALTE — REJOINS MOI"
            delay={50}
            duration={0.9}
            style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.22em", textTransform: "uppercase", color: "#FFB37A" }}
          />
          <BlurReveal
            as="h2"
            text="Le voyage se termine autour du feu"
            delay={65}
            duration={1.05}
            style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 46, fontWeight: 720, lineHeight: 1.05, color: "#F6F1FF" }}
          />
          <BlurReveal
            as="div"
            text="La fusée est posée, le feu crépite. C'est le moment de faire connaissance."
            delay={30}
            duration={0.9}
            style={{ fontSize: 17, lineHeight: 1.6, color: "#B9AEDC", maxWidth: 440 }}
          />
        </div>

      </div>

      {/* mise en page mobile — la scène illustrée (fusée posée, feu de camp,
          pilote assis) est abandonnée, mais le titre et le formulaire de
          contact (l'essentiel) restent intacts. */}
      <div
        className="stage-mobile"
        style={{
          position: "relative",
          padding: "90px 24px 130px",
          flexDirection: "column",
          justifyContent: "center",
          gap: 26,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <BlurReveal
            as="div"
            text="DERNIÈRE HALTE — REJOINS MOI"
            delay={50}
            duration={0.9}
            style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "#FFB37A" }}
          />
          <BlurReveal
            as="h2"
            text="Le voyage se termine autour du feu"
            delay={65}
            duration={1.05}
            style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "clamp(28px, 7.5vw, 36px)", fontWeight: 720, lineHeight: 1.1, color: "#F6F1FF" }}
          />
          <BlurReveal
            as="div"
            text="La fusée est posée, le feu crépite. C'est le moment de faire connaissance."
            delay={30}
            duration={0.9}
            style={{ fontSize: 15, lineHeight: 1.55, color: "#B9AEDC" }}
          />
        </div>

        {/* console de la fusée : formulaire de contact */}
        <div
          style={{
            position: "relative",
            width: "100%",
            borderRadius: "18px 18px 12px 12px",
            background: "linear-gradient(180deg, #3A2F6E 0%, #241A52 60%, #1A1240 100%)",
            border: "3px solid #6D5FAE",
            boxShadow: "0 18px 50px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(201, 188, 242, 0.35)",
            padding: "18px 20px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div style={{ position: "absolute", left: 10, top: 10, width: 7, height: 7, borderRadius: "50%", background: "#8F84C4" }} />
          <div style={{ position: "absolute", right: 10, top: 10, width: 7, height: 7, borderRadius: "50%", background: "#8F84C4" }} />
          <div style={{ position: "absolute", left: 10, bottom: 10, width: 7, height: 7, borderRadius: "50%", background: "#8F84C4" }} />
          <div style={{ position: "absolute", right: 10, bottom: 10, width: 7, height: 7, borderRadius: "50%", background: "#8F84C4" }} />

          <div style={{ display: "flex", alignItems: "center", gap: 10, borderBottom: "2px solid rgba(109, 95, 174, 0.4)", paddingBottom: 10 }}>
            <div style={{ display: "flex", gap: 6 }}>
              <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#FF8E6E", boxShadow: "0 0 6px rgba(255, 142, 110, 0.8)", animation: "ledpulse 2.2s ease-in-out infinite" }} />
              <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#FFD9A0", boxShadow: "0 0 6px rgba(255, 217, 160, 0.8)", animation: "ledpulse 1.6s ease-in-out 0.4s infinite" }} />
              <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#9FE8E4", boxShadow: "0 0 6px rgba(159, 232, 228, 0.8)", animation: "ledpulse 2.8s ease-in-out 0.9s infinite" }} />
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9BCF2" }}>
              console — transmission
            </div>
          </div>

          <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 720, lineHeight: 1.05, color: "#F6F1FF", minHeight: 26 }}>
            {typed}
            <span
              style={{
                display: "inline-block",
                width: 3,
                height: 18,
                background: "#FFB37A",
                marginLeft: 5,
                verticalAlign: -2,
                animation: "blinkcursor 1.1s steps(1) infinite",
              }}
            />
          </div>

          {!envoye ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              <input
                placeholder="VOTRE NOM"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="contact-input"
                style={{
                  border: "2px solid #4A3A8E",
                  borderRadius: 8,
                  background: "rgba(8, 6, 24, 0.7)",
                  color: "#F6F1FF",
                  fontFamily: "var(--font-mono)",
                  fontSize: 14,
                  letterSpacing: "0.06em",
                  padding: "11px 14px",
                  outline: "none",
                }}
              />
              <input
                placeholder="VOTRE EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="contact-input"
                style={{
                  border: "2px solid #4A3A8E",
                  borderRadius: 8,
                  background: "rgba(8, 6, 24, 0.7)",
                  color: "#F6F1FF",
                  fontFamily: "var(--font-mono)",
                  fontSize: 14,
                  letterSpacing: "0.06em",
                  padding: "11px 14px",
                  outline: "none",
                }}
              />
              <textarea
                placeholder="VOTRE MESSAGE…"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="contact-input"
                style={{
                  border: "2px solid #4A3A8E",
                  borderRadius: 8,
                  background: "rgba(8, 6, 24, 0.7)",
                  color: "#F6F1FF",
                  fontFamily: "var(--font-mono)",
                  fontSize: 14,
                  letterSpacing: "0.06em",
                  padding: "11px 14px",
                  outline: "none",
                  resize: "none",
                }}
              />
              <div
                onClick={envoyerSignal}
                className="contact-submit"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  background: "linear-gradient(120deg, #FFB37A, #FF8E6E)",
                  color: "#2A1004",
                  fontFamily: "var(--font-mono)",
                  fontSize: 15,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  borderRadius: 8,
                  padding: "13px 20px",
                  cursor: "pointer",
                  userSelect: "none",
                  boxShadow: "0 4px 0 #B5543E",
                  opacity: envoiEnCours ? 0.6 : 1,
                }}
              >
                {envoiEnCours ? "Transmission…" : "Transmettre →"}
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "14px 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#FFD9A0", fontFamily: "var(--font-mono)", fontSize: 16, fontWeight: 700, letterSpacing: "0.06em" }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FFB37A", animation: "orbitpulse 2s ease-out infinite" }} />
                SIGNAL TRANSMIS
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.55, color: "#B9AEDC" }}>
                Votre message voyage vers la station. Réponse sous 48 h, temps terrestre.
              </div>
            </div>
          )}

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, borderTop: "2px solid rgba(109, 95, 174, 0.4)", paddingTop: 10 }}>
            <a href={`mailto:${CONTACT_EMAIL}`} className="contact-link" style={{ color: "#C9BCF2", fontFamily: "var(--font-mono)", fontSize: 12, textDecoration: "none" }}>
              {CONTACT_EMAIL}
            </a>
            <span style={{ color: "rgba(201, 188, 242, 0.4)" }}>•</span>
            <a href={`tel:${CONTACT_PHONE.replace(/\s+/g, "")}`} className="contact-link" style={{ color: "#C9BCF2", fontFamily: "var(--font-mono)", fontSize: 12, textDecoration: "none" }}>
              {CONTACT_PHONE}
            </a>
          </div>
        </div>
      </div>

      {/* retour au point de départ : boucle — partagé desktop + mobile */}
      <a
        href="#accueil"
        className="scroll-hint"
        style={{
          position: "absolute",
          left: "50%",
          bottom: 26,
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 12,
          border: "1px solid rgba(201, 188, 242, 0.35)",
          borderRadius: 999,
          padding: "12px 24px",
          color: "#C9BCF2",
          fontSize: 15,
          letterSpacing: "0.08em",
          background: "rgba(11, 8, 34, 0.45)",
          textDecoration: "none",
          zIndex: 45,
        }}
      >
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FFB37A", animation: "orbitpulse 2.2s ease-out infinite" }} />
        reprendre le voyage depuis le début
      </a>
    </section>
  );
}
