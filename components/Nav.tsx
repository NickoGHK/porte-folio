import { navDefs } from "@/lib/data";

export default function Nav({ activeSection }: { activeSection: string }) {
  return (
    <div
      style={{
        position: "fixed",
        right: 22,
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        zIndex: 90,
      }}
    >
      {navDefs.map((item) => {
        const active = item.id === activeSection;
        return (
          <a
            key={item.id}
            href={item.href}
            title={item.title}
            className="nav-dot"
            style={{
              width: 11,
              height: 11,
              borderRadius: "50%",
              border: "1.5px solid rgba(255, 217, 160, 0.8)",
              background: "rgba(255, 179, 122, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              transition: "transform 0.35s ease, background 0.3s",
              transform: active ? "scale(1.35)" : "scale(1)",
            }}
          >
            {active && (
              <>
                <div
                  style={{
                    position: "absolute",
                    inset: -6,
                    borderRadius: "50%",
                    border: "1px dashed rgba(255, 217, 160, 0.65)",
                    animation: "navringspin 5s linear infinite",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle at 35% 30%, #FFF4DE 0%, #FFC894 45%, #C75E3A 100%)",
                    boxShadow: "0 0 4px rgba(255, 200, 148, 0.9)",
                    animation: "navtwinkle 1.8s ease-in-out infinite",
                    pointerEvents: "none",
                  }}
                />
              </>
            )}
          </a>
        );
      })}
    </div>
  );
}
