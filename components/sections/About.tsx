"use client";

import { useState } from "react";
import StarField from "@/components/StarField";
import BlurReveal from "@/components/BlurReveal";
import { sectionsApropos, diplomes, passions, outils, defsLunes, type ApSection } from "@/lib/data";

export default function About() {
  const [ap, setAp] = useState<ApSection>("apropos");
  const current = sectionsApropos[ap];

  return (
    <section
      id="apropos"
      data-scene="apropos"
      className="scene-section"
      style={{
        position: "relative",
        height: "100vh",
        minHeight: 860,
        overflow: "hidden",
        background:
          "linear-gradient(180deg, #241648 0%, #241648 10%, #231547 25%, #201444 50%, #1C1341 75%, #1B1240 90%, #1B1240 100%)",
      }}
    >
      <div data-parallax="-0.3" style={{ position: "absolute", left: 0, right: 0, top: -340, bottom: -340 }}>
        <StarField seed={2468101} />
      </div>

      <div data-parallax="-0.22" style={{ position: "absolute", left: 0, right: 0, top: -260, bottom: -260, pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            left: "-10vw",
            top: 40,
            width: 680,
            height: 560,
            background: "radial-gradient(closest-side, rgba(168, 120, 255, 0.18), transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      <div className="stage-desktop stage-scale-center" style={{ position: "absolute", left: "50%", top: "50%", width: 1440, height: 900 }}>
        <div data-parallax="-0.08" style={{ position: "absolute", inset: 0 }}>
          {/* orbites + satellites */}
          <div
            style={{
              position: "absolute",
              left: 940,
              top: 620,
              width: 760,
              height: 760,
              transform: "translate(-50%, -50%)",
              border: "2px dashed rgba(201, 188, 242, 0.25)",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 940,
              top: 620,
              width: 1120,
              height: 1120,
              transform: "translate(-50%, -50%)",
              border: "2px dashed rgba(201, 188, 242, 0.16)",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 940,
              top: 620,
              width: 760,
              height: 760,
              animation: "orbitspin 70s linear infinite",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: -7,
                transform: "translateX(-50%)",
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 30%, #D7C9F6, #7C63C8)",
                boxShadow: "0 0 10px rgba(215, 201, 246, 0.5)",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: 940,
              top: 620,
              width: 1120,
              height: 1120,
              animation: "orbitspin 115s linear infinite reverse",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: -6,
                transform: "translateX(-50%)",
                width: 11,
                height: 11,
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 30%, #9FE8E4, #3E8F8B)",
                boxShadow: "0 0 10px rgba(159, 232, 228, 0.45)",
              }}
            />
          </div>

          {/* astéroïde-maison */}
          <div style={{ position: "absolute", left: 720, top: 400, width: 440, height: 440 }}>
            <div
              style={{
                position: "absolute",
                inset: -10,
                borderRadius: "50%",
                border: "6px solid rgba(168, 120, 255, 0.18)",
                filter: "blur(8px)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: "radial-gradient(circle at 34% 26%, #4A3690 0%, #34266E 55%, #221850 100%)",
                boxShadow: "0 0 100px rgba(74, 54, 144, 0.35)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "22%",
                top: "30%",
                width: 42,
                height: 42,
                borderRadius: "50%",
                background: "rgba(20, 14, 52, 0.45)",
                boxShadow: "inset 3px 4px 6px rgba(8, 5, 24, 0.55), inset -1px -2px 3px rgba(201, 188, 242, 0.14)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "62%",
                top: "56%",
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "rgba(20, 14, 52, 0.4)",
                boxShadow: "inset 2px 3px 5px rgba(8, 5, 24, 0.5), inset -1px -1px 2px rgba(201, 188, 242, 0.12)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "40%",
                top: "68%",
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "rgba(20, 14, 52, 0.38)",
                boxShadow: "inset 2px 2px 4px rgba(8, 5, 24, 0.5)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: "radial-gradient(circle at 34% 26%, transparent 44%, rgba(8, 5, 26, 0.45) 90%)",
                pointerEvents: "none",
              }}
            />

            {/* cabane + feu de camp */}
            <div style={{ position: "absolute", left: "50%", top: -32, transform: "translateX(-50%)" }}>
              <div style={{ width: 74, height: 50, background: "#1D1546", borderRadius: "5px 5px 0 0", position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: -26,
                    transform: "translateX(-50%)",
                    width: 90,
                    height: 28,
                    background: "#2B2060",
                    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: 14,
                    top: 14,
                    width: 16,
                    height: 20,
                    borderRadius: 3,
                    background: "#FFD9A0",
                    boxShadow: "0 0 30px 8px rgba(255, 217, 160, 0.5)",
                    animation: "glowpulse 3s ease-in-out infinite",
                  }}
                />
              </div>
              <div style={{ position: "absolute", right: -58, bottom: -4, width: 44, height: 34 }}>
                <div
                  style={{
                    position: "absolute",
                    left: 4,
                    bottom: 0,
                    width: 34,
                    height: 7,
                    borderRadius: 4,
                    background: "#4A2E20",
                    transform: "rotate(10deg)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: 6,
                    bottom: 0,
                    width: 34,
                    height: 7,
                    borderRadius: 4,
                    background: "#5C3A28",
                    transform: "rotate(-12deg)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    bottom: 4,
                    transform: "translateX(-50%)",
                    width: 18,
                    height: 24,
                    background: "linear-gradient(180deg, #FFD9A0, #FF8E6E)",
                    clipPath: "polygon(50% 0%, 10% 62%, 20% 100%, 80% 100%, 90% 62%)",
                    borderRadius: 4,
                    transformOrigin: "bottom center",
                    animation: "flame 1.1s ease-in-out infinite",
                    boxShadow: "0 0 36px 10px rgba(255, 142, 110, 0.3)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    bottom: 4,
                    transform: "translateX(-50%)",
                    width: 9,
                    height: 13,
                    background: "#FFF3D6",
                    clipPath: "polygon(50% 0%, 14% 64%, 24% 100%, 76% 100%, 86% 64%)",
                    borderRadius: 3,
                    transformOrigin: "bottom center",
                    animation: "flame 0.8s ease-in-out 0.2s infinite",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* lunes cliquables */}
        {defsLunes.map((lune) => {
          const active = lune.key === ap;
          return (
            <div
              key={lune.key}
              onClick={() => setAp(lune.key)}
              style={{
                position: "absolute",
                left: lune.left,
                top: lune.top,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                animation: `floaty ${lune.dur}s ease-in-out ${lune.delay}s infinite`,
                cursor: "pointer",
                zIndex: 5,
              }}
            >
              <div
                className="lune-dot"
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: "50%",
                  background: lune.bg,
                  boxShadow: active
                    ? "0 0 0 4px rgba(255, 217, 160, 0.65), 0 0 34px rgba(255, 217, 160, 0.5)"
                    : "0 0 14px rgba(20, 14, 52, 0.4)",
                  transition: "box-shadow 0.4s ease, transform 0.3s ease",
                }}
              />
              <div
                style={{
                  fontSize: 14,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: active ? "#FFD9A0" : "#C9BCF2",
                  fontWeight: active ? 700 : 400,
                }}
              >
                {lune.label}
              </div>
            </div>
          );
        })}

        {/* texte à propos */}
        <div style={{ position: "absolute", left: 120, top: 210, display: "flex", flexDirection: "column", gap: 22, maxWidth: 470 }}>
          <BlurReveal
            as="div"
            text={current.label}
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
            as="h2"
            text={current.titre}
            delay={90}
            duration={1.1}
            style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 66, fontWeight: 720, lineHeight: 1.02, color: "#F6F1FF" }}
          />
          {current.paras.map((para, i) => (
            <BlurReveal key={i} as="div" text={para} delay={35} duration={0.9} style={{ fontSize: 20, lineHeight: 1.7, color: "#B9AEDC" }} />
          ))}

          {ap === "diplomes" && (
            <div style={{ display: "flex", flexDirection: "column", marginTop: 2 }}>
              {diplomes.map((etape, i) => (
                <div key={i} style={{ display: "flex", gap: 12 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 10, flexShrink: 0 }}>
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: "radial-gradient(circle at 35% 30%, #D7C9F6, #7C63C8)",
                        boxShadow: "0 0 8px rgba(215, 201, 246, 0.5)",
                        flexShrink: 0,
                      }}
                    />
                    {i < diplomes.length - 1 && (
                      <div
                        style={{
                          width: 2,
                          flex: 1,
                          minHeight: 16,
                          background:
                            "repeating-linear-gradient(180deg, rgba(201, 188, 242, 0.45) 0px, rgba(201, 188, 242, 0.45) 4px, transparent 4px, transparent 8px)",
                        }}
                      />
                    )}
                  </div>
                  <div style={{ paddingBottom: 10 }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9C8DC9" }}>
                      {etape.periode}
                    </div>
                    <div style={{ fontSize: 14, color: "#F0EBFF", fontWeight: 600, marginTop: 1, lineHeight: 1.25 }}>{etape.titre}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {ap === "passions" && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 6 }}>
              {passions.map((passion) => (
                <div key={passion.nom} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: 92 }}>
                  <div
                    className="tile-icon"
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 16,
                      overflow: "hidden",
                      background: passion.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow:
                        "inset 0 2px 3px rgba(255, 255, 255, 0.14), inset 0 -3px 6px rgba(0, 0, 0, 0.45), 0 8px 24px rgba(0, 0, 0, 0.35)",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    <div
                      role="img"
                      aria-label={passion.nom}
                      style={{
                        width: passion.taille,
                        height: passion.taille,
                        backgroundImage: `url(${passion.img})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {ap === "outils" && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 6 }}>
              {outils.map((outil) => (
                <div key={outil.nom} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: 92 }}>
                  <div
                    className="tile-icon"
                    style={{
                      position: "relative",
                      width: 64,
                      height: 64,
                      borderRadius: 16,
                      background: outil.bg,
                      color: outil.fg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-display)",
                      fontSize: 24,
                      fontWeight: 700,
                      boxShadow:
                        "inset 0 2px 3px rgba(255, 255, 255, 0.14), inset 0 -3px 6px rgba(0, 0, 0, 0.45), 0 8px 24px rgba(0, 0, 0, 0.35)",
                      overflow: "hidden",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    {outil.img ? (
                      <div
                        role="img"
                        aria-label={outil.nom}
                        style={{
                          width: outil.taille,
                          height: outil.taille,
                          backgroundImage: `url(${outil.img})`,
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                        }}
                      />
                    ) : (
                      <span>{outil.mono}</span>
                    )}
                  </div>
                  <div style={{ fontSize: 13, color: "#C9BCF2", textAlign: "center" }}>{outil.nom}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* mise en page mobile */}
      <div
        className="stage-mobile"
        style={{
          position: "relative",
          padding: "90px 24px 40px",
          flexDirection: "column",
          gap: 22,
        }}
      >
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {defsLunes.map((lune) => {
            const active = lune.key === ap;
            return (
              <div
                key={lune.key}
                onClick={() => setAp(lune.key)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 14px 8px 8px",
                  borderRadius: 999,
                  border: active ? "1px solid rgba(255, 217, 160, 0.7)" : "1px solid rgba(201, 188, 242, 0.25)",
                  background: active ? "rgba(255, 179, 122, 0.12)" : "rgba(11, 8, 34, 0.4)",
                  cursor: "pointer",
                }}
              >
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: lune.bg, flexShrink: 0 }} />
                <div
                  style={{
                    fontSize: 12,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: active ? "#FFD9A0" : "#C9BCF2",
                    fontWeight: active ? 700 : 400,
                  }}
                >
                  {lune.label.trim()}
                </div>
              </div>
            );
          })}
        </div>

        <BlurReveal
          as="div"
          text={current.label}
          delay={55}
          duration={0.9}
          style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "#FFB37A" }}
        />
        <BlurReveal
          as="h2"
          text={current.titre}
          delay={90}
          duration={1.1}
          style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "clamp(30px, 8vw, 40px)", fontWeight: 720, lineHeight: 1.05, color: "#F6F1FF" }}
        />
        {current.paras.map((para, i) => (
          <BlurReveal key={i} as="div" text={para} delay={35} duration={0.9} style={{ fontSize: 16, lineHeight: 1.6, color: "#B9AEDC" }} />
        ))}

        {ap === "diplomes" && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {diplomes.map((etape, i) => (
              <div key={i} style={{ display: "flex", gap: 12 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 10, flexShrink: 0 }}>
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "radial-gradient(circle at 35% 30%, #D7C9F6, #7C63C8)",
                      boxShadow: "0 0 8px rgba(215, 201, 246, 0.5)",
                      flexShrink: 0,
                    }}
                  />
                  {i < diplomes.length - 1 && (
                    <div
                      style={{
                        width: 2,
                        flex: 1,
                        minHeight: 16,
                        background:
                          "repeating-linear-gradient(180deg, rgba(201, 188, 242, 0.45) 0px, rgba(201, 188, 242, 0.45) 4px, transparent 4px, transparent 8px)",
                      }}
                    />
                  )}
                </div>
                <div style={{ paddingBottom: 12 }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9C8DC9" }}>
                    {etape.periode}
                  </div>
                  <div style={{ fontSize: 14, color: "#F0EBFF", fontWeight: 600, marginTop: 1, lineHeight: 1.25 }}>{etape.titre}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {ap === "passions" && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            {passions.map((passion) => (
              <div key={passion.nom} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: 80 }}>
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 16,
                    overflow: "hidden",
                    background: passion.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "inset 0 2px 3px rgba(255, 255, 255, 0.14), inset 0 -3px 6px rgba(0, 0, 0, 0.45), 0 8px 24px rgba(0, 0, 0, 0.35)",
                  }}
                >
                  <div
                    role="img"
                    aria-label={passion.nom}
                    style={{
                      width: passion.taille * 0.9,
                      height: passion.taille * 0.9,
                      backgroundImage: `url(${passion.img})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {ap === "outils" && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            {outils.map((outil) => (
              <div key={outil.nom} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: 80 }}>
                <div
                  style={{
                    position: "relative",
                    width: 60,
                    height: 60,
                    borderRadius: 16,
                    background: outil.bg,
                    color: outil.fg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display)",
                    fontSize: 22,
                    fontWeight: 700,
                    boxShadow: "inset 0 2px 3px rgba(255, 255, 255, 0.14), inset 0 -3px 6px rgba(0, 0, 0, 0.45), 0 8px 24px rgba(0, 0, 0, 0.35)",
                    overflow: "hidden",
                  }}
                >
                  {outil.img ? (
                    <div
                      role="img"
                      aria-label={outil.nom}
                      style={{
                        width: (outil.taille ?? 40) * 0.9,
                        height: (outil.taille ?? 40) * 0.9,
                        backgroundImage: `url(${outil.img})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                      }}
                    />
                  ) : (
                    <span>{outil.mono}</span>
                  )}
                </div>
                <div style={{ fontSize: 12, color: "#C9BCF2", textAlign: "center" }}>{outil.nom}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
