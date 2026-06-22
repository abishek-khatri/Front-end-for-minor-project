import { useState } from "react";
import { Link } from "react-router-dom";
import { C, font, radius } from "../styles/tokens";
import Navbar from "../components/Navbar";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div style={{ background: C.bg0, minHeight: "100vh", fontFamily: font.body }}>
      <Navbar />
      <Hero />
      <TrustBar />
      <Features />
      <HowItWorks />
      <Footer />
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [url, setUrl] = useState("");

  return (
    <section style={{
      minHeight: "100vh",
      display: "flex", alignItems: "center",
      paddingTop: 60,
      background: `
        radial-gradient(ellipse 65% 55% at 50% -5%, rgba(0,212,255,0.11) 0%, transparent 65%),
        radial-gradient(ellipse 40% 40% at 85% 30%, rgba(108,71,255,0.09) 0%, transparent 60%),
        ${C.bg0}
      `,
      position: "relative", overflow: "hidden",
    }}>

      {/* Grid texture */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: `
          linear-gradient(${C.cyan}08 1px, transparent 1px),
          linear-gradient(90deg, ${C.cyan}08 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent)",
      }}/>

      <div style={{
        maxWidth: 1140, margin: "0 auto", padding: "0 24px",
        position: "relative", zIndex: 1,
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: 80, alignItems: "center",
      }}>
        {/* Left — Copy */}
        <div>
          {/* Eyebrow */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "5px 12px", borderRadius: radius.sm,
            background: "rgba(0,212,255,0.08)",
            border: `1px solid ${C.border}`,
            marginBottom: 24,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: 3,
              background: C.cyan, display: "block",
              animation: "pulse 1.8s ease-in-out infinite",
            }}/>
            <span style={{
              fontFamily: font.mono, fontSize: 11,
              color: C.cyan, letterSpacing: "0.1em",
              textTransform: "uppercase", fontWeight: 600,
            }}>
              AI Deepfake Detector · v2.1
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: font.heading,
            fontSize: "clamp(36px, 5vw, 60px)",
            fontWeight: 800, lineHeight: 1.08,
            color: C.white, margin: "0 0 20px",
            letterSpacing: "-0.035em",
          }}>
            Is this image{" "}
            <span style={{
              color: C.cyan,
              textDecoration: "underline",
              textDecorationColor: C.cyan + "50",
              textUnderlineOffset: 6,
              textDecorationThickness: 2,
            }}>real?</span>
            <br />
            Find out in 3s.
          </h1>

          <p style={{
            fontSize: 17, color: C.muted, lineHeight: 1.7,
            margin: "0 0 36px", maxWidth: 440,
          }}>
            DeepSight runs your image through Xception + EfficientNet-B4
            — two models trained on FaceForensics++ — and fuses their outputs
            into one verdict you can trust.
          </p>

          {/* URL Input */}
          <div style={{
            display: "flex", alignItems: "stretch",
            border: `1px solid ${C.border}`,
            borderRadius: radius.md,
            background: C.bg2, overflow: "hidden",
            marginBottom: 14, transition: "border-color 0.2s",
          }}
          onFocusCapture={e => e.currentTarget.style.borderColor = C.cyan + "50"}
          onBlurCapture={e => e.currentTarget.style.borderColor = C.border}
          >
            <span style={{
              padding: "0 14px", display: "flex", alignItems: "center",
              color: C.muted, fontSize: 15, borderRight: `1px solid ${C.faint}`,
            }}>https://</span>
            <input
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="paste image URL…"
              style={{
                flex: 1, background: "transparent", border: "none",
                outline: "none", color: C.white, fontSize: 14,
                padding: "13px 14px", fontFamily: font.mono,
              }}
            />
            <Link to="/analyze" style={{
              padding: "0 22px", background: C.cyan,
              color: C.bg0, fontSize: 13, fontWeight: 700,
              textDecoration: "none", display: "flex", alignItems: "center",
              letterSpacing: "0.02em", transition: "background 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = C.cyanDim}
            onMouseLeave={e => e.currentTarget.style.background = C.cyan}
            >
              Analyze →
            </Link>
          </div>

          <p style={{ fontSize: 12, color: C.muted, margin: 0, fontFamily: font.mono }}>
            or{" "}
            <Link to="/analyze" style={{ color: C.cyan, textDecoration: "none" }}>
              open the uploader
            </Link>
            {" "}to drag & drop a file · No signup needed for 5 free analyses
          </p>

          {/* CTA row */}
          <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
            <Link to="/signup" style={{
              padding: "12px 26px", borderRadius: radius.sm,
              background: C.cyan, color: C.bg0, fontWeight: 700,
              fontSize: 14, textDecoration: "none",
              transition: "opacity 0.15s", letterSpacing: "0.01em",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              Create free account
            </Link>
            <a href="#how-it-works" style={{
              padding: "12px 26px", borderRadius: radius.sm,
              border: `1px solid ${C.faint}`, color: C.muted,
              fontSize: 14, textDecoration: "none",
              transition: "border-color 0.15s, color 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.white; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.faint; e.currentTarget.style.color = C.muted; }}
            >
              See how it works ↓
            </a>
          </div>
        </div>

        {/* Right — Detection card demo */}
        <DetectionDemo />
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }`}</style>
    </section>
  );
}

function DetectionDemo() {
  const bars = [
    { label: "Xception", value: 91.2, color: C.cyan },
    { label: "EfficientNet-B4", value: 87.6, color: C.purple },
    { label: "Ensemble", value: 89.4, color: C.cyan },
  ];

  return (
    <div style={{
      background: C.bg2,
      border: `1px solid ${C.faint}`,
      borderRadius: radius.lg,
      overflow: "hidden",
    }}>
      {/* Card header */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "12px 18px",
        borderBottom: `1px solid ${C.faint}`,
      }}>
        {["#e8394a","#f59e0b","#22c55e"].map(c => (
          <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }}/>
        ))}
        <span style={{
          fontFamily: font.mono, fontSize: 11, color: C.muted,
          marginLeft: 8, letterSpacing: "0.06em",
        }}>deepsight — analysis result</span>
      </div>

      {/* Image placeholder */}
      <div style={{
        background: C.bg3, margin: 18, borderRadius: radius.sm,
        height: 140, display: "flex", alignItems: "center",
        justifyContent: "center", flexDirection: "column", gap: 6,
        border: `1px solid ${C.faint}`,
      }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="14" r="6" stroke={C.muted} strokeWidth="1.5"/>
          <circle cx="16" cy="14" r="2.5" fill={C.muted}/>
          <path d="M8 28c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke={C.muted} strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span style={{ fontFamily: font.mono, fontSize: 11, color: C.muted, letterSpacing: "0.06em" }}>
          profile_photo.jpg
        </span>
      </div>

      {/* Confidence bars */}
      <div style={{ padding: "0 18px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
        {bars.map(b => (
          <div key={b.label}>
            <div style={{
              display: "flex", justifyContent: "space-between",
              marginBottom: 5,
            }}>
              <span style={{ fontFamily: font.mono, fontSize: 11, color: C.muted }}>{b.label}</span>
              <span style={{ fontFamily: font.mono, fontSize: 11, color: b.color, fontWeight: 700 }}>
                {b.value.toFixed(1)}%
              </span>
            </div>
            <div style={{ height: 5, background: C.bg3, borderRadius: 3, overflow: "hidden" }}>
              <div style={{
                width: `${b.value}%`, height: "100%",
                background: b.color, borderRadius: 3,
                opacity: 0.85,
              }}/>
            </div>
          </div>
        ))}
      </div>

      {/* Verdict banner */}
      <div style={{
        margin: "0 18px 18px",
        padding: "12px 16px",
        background: "rgba(232,57,74,0.12)",
        border: `1px solid rgba(232,57,74,0.3)`,
        borderRadius: radius.sm,
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1L15 14H1L8 1z" stroke="#e8394a" strokeWidth="1.4" strokeLinejoin="round"/>
          <path d="M8 6v4M8 11.5v.5" stroke="#e8394a" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
        <div>
          <span style={{
            fontFamily: font.mono, fontSize: 12,
            color: "#e8394a", fontWeight: 700, letterSpacing: "0.08em",
          }}>FAKE DETECTED</span>
          <span style={{
            fontFamily: font.mono, fontSize: 11, color: C.muted,
            marginLeft: 10,
          }}>confidence 89.4%</span>
        </div>
      </div>

      {/* Analysis time */}
      <div style={{
        padding: "10px 18px", borderTop: `1px solid ${C.faint}`,
        display: "flex", justifyContent: "space-between",
      }}>
        <span style={{ fontFamily: font.mono, fontSize: 10, color: C.muted }}>analysis_ms</span>
        <span style={{ fontFamily: font.mono, fontSize: 10, color: C.cyan }}>2,147</span>
      </div>
    </div>
  );
}

// ─── Trust Bar ────────────────────────────────────────────────────────────────
function TrustBar() {
  const items = [
    { v: "98.7%", l: "Detection accuracy" },
    { v: "<3s",   l: "Per-image analysis" },
    { v: "2",     l: "AI models fused" },
    { v: "0",     l: "Data retained" },
  ];
  return (
    <div style={{
      borderTop: `1px solid ${C.faint}`,
      borderBottom: `1px solid ${C.faint}`,
      background: C.bg1,
    }}>
      <div style={{
        maxWidth: 1140, margin: "0 auto", padding: "0 24px",
        display: "grid", gridTemplateColumns: "repeat(4,1fr)",
      }}>
        {items.map(({ v, l }, i) => (
          <div key={i} style={{
            padding: "28px 0",
            borderRight: i < items.length - 1 ? `1px solid ${C.faint}` : "none",
            paddingLeft: i > 0 ? 40 : 0,
          }}>
            <div style={{
              fontFamily: font.heading, fontSize: 32, fontWeight: 800,
              color: C.cyan, letterSpacing: "-0.03em", lineHeight: 1,
            }}>{v}</div>
            <div style={{ fontSize: 13, color: C.muted, marginTop: 4, fontFamily: font.body }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}