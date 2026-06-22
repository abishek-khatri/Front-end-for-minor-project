import { Link } from "react-router-dom";
import { C, font } from "../styles/tokens";

export default function Footer() {
  const cols = [
    { heading: "Product",   links: [{ l: "Analyze", to: "/analyze" }, { l: "API Docs", to: "#" }, { l: "GitHub", to: "#" }] },
    { heading: "Project",   links: [{ l: "About DeepSight", to: "#" }, { l: "Research Paper", to: "#" }, { l: "Model Cards", to: "#" }] },
    { heading: "Legal",     links: [{ l: "Privacy Policy", to: "#" }, { l: "Terms", to: "#" }] },
  ];

  return (
    <footer style={{
      background: C.bg0,
      borderTop: `1px solid ${C.faint}`,
      padding: "48px 0 28px",
    }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>

          {/* Brand */}
          <div>
            <Link to="/" style={{
              textDecoration: "none", display: "inline-flex",
              alignItems: "center", gap: 8, marginBottom: 14,
            }}>
              <span style={{
                fontFamily: font.heading, fontSize: 16, fontWeight: 800,
                color: C.white, letterSpacing: "-0.02em",
              }}>
                Deep<span style={{ color: C.cyan }}>Sight</span>
              </span>
            </Link>
            <p style={{
              fontSize: 13, color: C.muted, lineHeight: 1.65,
              fontFamily: font.body, maxWidth: 220, margin: "0 0 14px",
            }}>
              AI-powered deepfake detection. Dual-model ensemble.
              Open research, practical tool.
            </p>
            <p style={{
              fontFamily: font.mono, fontSize: 11,
              color: C.muted + "80", letterSpacing: "0.04em",
            }}>
              BCT Year III Minor Project<br/>
              Janakpur Engineering College · TU
            </p>
          </div>

          {cols.map(col => (
            <div key={col.heading}>
              <p style={{
                fontFamily: font.mono, fontSize: 11, color: C.cyan,
                textTransform: "uppercase", letterSpacing: "0.1em",
                margin: "0 0 14px", fontWeight: 600,
              }}>{col.heading}</p>
              {col.links.map(({ l, to }) => (
                <Link key={l} to={to} style={{
                  display: "block", fontSize: 13, color: C.muted,
                  textDecoration: "none", marginBottom: 9,
                  fontFamily: font.body, transition: "color 0.15s",
                }}
                onMouseEnter={e => e.target.style.color = C.white}
                onMouseLeave={e => e.target.style.color = C.muted}
                >{l}</Link>
              ))}
            </div>
          ))}
        </div>

        <div style={{
          borderTop: `1px solid ${C.faint}`,
          paddingTop: 22, display: "flex",
          justifyContent: "space-between", alignItems: "center",
        }}>
          <p style={{ fontSize: 12, color: C.muted + "88", margin: 0, fontFamily: font.mono }}>
            © 2025 DeepSight — ENCT Minor Project
          </p>
          <p style={{ fontSize: 12, color: C.muted + "88", margin: 0, fontFamily: font.mono }}>
            Xception · EfficientNet-B4 · FaceForensics++
          </p>
        </div>
      </div>
    </footer>
  );
}