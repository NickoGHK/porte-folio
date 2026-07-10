import StarField from "@/components/StarField";
import BlurReveal from "@/components/BlurReveal";

export default function Hero() {
  return (
    <section
      id="accueil"
      data-scene="accueil"
      className="scene-section"
      style={{
        position: "relative",
        height: "100vh",
        minHeight: 800,
        overflow: "hidden",
        background:
          "linear-gradient(180deg, #0A0620 0%, #0B0621 10%, #0E0926 25%, #170E34 50%, #201442 75%, #231647 90%, #241648 100%)",
      }}
    >
      <div data-parallax="-0.3" style={{ position: "absolute", left: 0, right: 0, top: -340, bottom: -340 }}>
        <StarField seed={1234567} />
      </div>

      <div
        data-parallax="-0.22"
        style={{ position: "absolute", left: 0, right: 0, top: -260, bottom: -260, pointerEvents: "none" }}
      >
        <div
          style={{
            position: "absolute",
            left: "-10vw",
            top: 120,
            width: 720,
            height: 560,
            background: "radial-gradient(closest-side, rgba(168, 120, 255, 0.22), transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "-8vw",
            top: 300,
            width: 640,
            height: 420,
            background: "radial-gradient(closest-side, rgba(255, 142, 110, 0.14), transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* scène centrée — desktop / tablette (mise à l'échelle CSS en dessous de 1440px) */}
      <div
        className="stage-desktop stage-scale-bottom"
        style={{ position: "absolute", left: "50%", bottom: 0, width: 1440, height: 900 }}
      >
        <div data-parallax="-0.12" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {/* lune — deux couches de profondeur avec des vélocités de souris
              différentes : le halo (plus loin, dérive à peine) et le corps
              solide + cratères (plus proche, bouge davantage). Chacune sur
              son propre wrapper pour ne pas entrer en conflit avec le
              transform de l'animation flottante CSS. */}
          <div style={{ position: "absolute", right: 140, top: 90, width: 170, height: 170 }}>
          <div data-mouse-parallax="0.018" style={{ position: "absolute", inset: -8 }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: "5px solid rgba(215, 201, 246, 0.25)",
                filter: "blur(6px)",
              }}
            />
          </div>
          <div data-mouse-parallax="0.045" style={{ position: "absolute", inset: 0 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: "radial-gradient(circle at 34% 30%, #F7F0FF 0%, #D7C9F6 45%, #A48FE0 100%)",
              boxShadow: "0 0 90px rgba(215, 201, 246, 0.35)",
              animation: "floaty 9s ease-in-out infinite",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "28%",
                top: "52%",
                width: 26,
                height: 26,
                borderRadius: "50%",
                background: "rgba(126, 102, 190, 0.35)",
                boxShadow: "inset 2px 3px 5px rgba(74, 54, 144, 0.5), inset -1px -1px 2px rgba(255, 255, 255, 0.25)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "58%",
                top: "26%",
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "rgba(126, 102, 190, 0.3)",
                boxShadow: "inset 2px 2px 4px rgba(74, 54, 144, 0.45)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "52%",
                top: "64%",
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "rgba(126, 102, 190, 0.28)",
                boxShadow: "inset 1px 2px 3px rgba(74, 54, 144, 0.45)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 34% 30%, transparent 48%, rgba(52, 34, 100, 0.32) 92%)",
              }}
            />
          </div>
          </div>
          </div>

          {/* trajectoire + satellite */}
          <div
            style={{
              position: "absolute",
              left: 480,
              top: -560,
              width: 1500,
              height: 1500,
              border: "2px dashed rgba(255, 217, 160, 0.3)",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 480,
              top: -560,
              width: 1500,
              height: 1500,
              animation: "orbitspin2 90s linear infinite",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: -5,
                transform: "translateX(-50%)",
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#FFD9A0",
                boxShadow: "0 0 12px 3px rgba(255, 217, 160, 0.55)",
              }}
            />
          </div>
        </div>

        {/* bloc titre */}
        <div style={{ position: "absolute", left: 120, top: 200, display: "flex", flexDirection: "column", gap: 18, maxWidth: 660 }}>
          <BlurReveal
            as="div"
            text="portfolio — un voyage en scroll"
            delay={55}
            duration={0.9}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 15,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#FFB37A",
            }}
          />
          <BlurReveal
            as="h1"
            text="Nicolas Boislard"
            delay={110}
            duration={1.2}
            style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontSize: 108,
              fontWeight: 750,
              lineHeight: 0.98,
              color: "#F6F1FF",
              textShadow: "0 0 60px rgba(168, 120, 255, 0.35)",
            }}
          />
          <BlurReveal
            as="div"
            text="Graphiste - Artiste Auteur"
            delay={90}
            duration={1.0}
            style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 400, color: "#FFB37A", letterSpacing: "0.04em" }}
          />
          <div style={{ fontSize: 21, lineHeight: 1.6, color: "#B9AEDC", maxWidth: 460 }}>
            <BlurReveal as="span" text="Chaque projet est une escale dans l'espace." delay={40} duration={0.9} style={{ display: "inline-flex" }} />
            <br />
            <BlurReveal as="span" text="Le voyage commence ici, et finit… ici aussi." delay={40} duration={0.9} style={{ display: "inline-flex" }} />
          </div>
        </div>
      </div>

      {/* mise en page mobile */}
      <div
        className="stage-mobile"
        style={{
          position: "relative",
          padding: "120px 24px 170px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -30,
            top: 24,
            width: 84,
            height: 84,
            borderRadius: "50%",
            background: "radial-gradient(circle at 34% 30%, #F7F0FF 0%, #D7C9F6 45%, #A48FE0 100%)",
            boxShadow: "0 0 50px rgba(215, 201, 246, 0.3)",
            animation: "floaty 9s ease-in-out infinite",
          }}
        />
        <BlurReveal
          as="div"
          text="portfolio — un voyage en scroll"
          delay={55}
          duration={0.9}
          style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "#FFB37A" }}
        />
        <BlurReveal
          as="h1"
          text="Nicolas Boislard"
          delay={110}
          duration={1.2}
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontSize: "clamp(40px, 11vw, 56px)",
            fontWeight: 750,
            lineHeight: 1.02,
            color: "#F6F1FF",
            textShadow: "0 0 40px rgba(168, 120, 255, 0.35)",
          }}
        />
        <BlurReveal
          as="div"
          text="Graphiste - Artiste Auteur"
          delay={90}
          duration={1.0}
          style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 400, color: "#FFB37A", letterSpacing: "0.03em" }}
        />
        <div style={{ fontSize: 16, lineHeight: 1.55, color: "#B9AEDC", maxWidth: 400 }}>
          <BlurReveal as="span" text="Chaque projet est une escale dans l'espace." delay={40} duration={0.9} style={{ display: "inline-flex" }} />
          <br />
          <BlurReveal as="span" text="Le voyage commence ici, et finit… ici aussi." delay={40} duration={0.9} style={{ display: "inline-flex" }} />
        </div>
      </div>

      {/* indication scroll */}
      <a
        href="#apropos"
        className="scroll-hint"
        style={{
          position: "absolute",
          left: "50%",
          bottom: 42,
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
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#FFB37A",
            animation: "orbitpulse 2.2s ease-out infinite",
          }}
        />
        faire défiler pour décoller
      </a>
    </section>
  );
}
