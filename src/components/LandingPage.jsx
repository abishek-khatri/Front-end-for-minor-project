import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { C, font, radius, size } from '../styles/tokens';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div style={{ background: C.bg0, minHeight: '100vh', fontFamily: font.body }}>
      <Navbar />
      <Hero />
      <StatsRail />
      <HowItWorks />
      <Models />
      <Footer />
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      paddingTop: size.navH,
      display: 'flex', alignItems: 'center',
      borderBottom: `1px solid ${C.rule}`,
    }}>
      <div style={{
        maxWidth: size.maxW, margin: '0 auto',
        padding: '60px 24px',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 80, alignItems: 'center',
      }}>
        {/* Left */}
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            marginBottom: 32,
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: C.red,
              animation: 'blink 1.6s step-end infinite',
            }}/>
            <span style={{
              fontFamily: font.mono, fontSize: 11, color: C.inkMid,
              letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>
              Ensemble v2.1 — Live
            </span>
            <style>{`@keyframes blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }`}</style>
          </div>

          <h1 style={{
            fontFamily: font.display,
            fontSize: 'clamp(40px,5.5vw,72px)',
            fontWeight: 700, color: C.ink,
            lineHeight: 1.0, letterSpacing: '-0.04em',
            margin: '0 0 8px',
          }}>
            DETECT.<br />
            <span style={{ color: C.red }}>VERIFY.</span><br />
            TRUST.
          </h1>

          <div style={{
            width: 48, height: 2, background: C.rule, margin: '28px 0',
          }}/>

          <p style={{
            fontSize: 16, color: C.inkMid, lineHeight: 1.7,
            margin: '0 0 40px', maxWidth: 400,
            fontFamily: font.body,
          }}>
            Two AI models — Xception and EfficientNet-B4 — trained on
            FaceForensics++ and fused into one verdict. Drop an image.
            Know the truth in under 3 seconds.
          </p>

          <div style={{ display: 'flex', gap: 12 }}>
            <Link to="/analyze" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 24px', borderRadius: radius.sm,
              background: C.ink, color: C.white,
              fontFamily: font.mono, fontSize: 12,
              fontWeight: 700, textDecoration: 'none',
              letterSpacing: '0.06em', textTransform: 'uppercase',
              border: `1px solid ${C.ink}`,
              transition: 'background 0.15s, border-color 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = C.red; e.currentTarget.style.borderColor = C.red; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.ink; e.currentTarget.style.borderColor = C.ink; }}>
              Run Analysis
            </Link>
            <a href="#how-it-works" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 24px', borderRadius: radius.sm,
              border: `1px solid ${C.rule}`, color: C.inkMid,
              fontFamily: font.mono, fontSize: 12,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'border-color 0.15s, color 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.ink; e.currentTarget.style.color = C.ink; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.rule; e.currentTarget.style.color = C.inkMid; }}>
              See how →
            </a>
          </div>
        </div>

        {/* Right — Annotated forensics card */}
        <ForensicsCard />
      </div>
    </section>
  );
}

// The signature element: a forensics-report style analysis card
// with annotation callout lines
function ForensicsCard() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => (t + 1) % 4), 900);
    return () => clearInterval(id);
  }, []);

  const annotations = [
    { x: 38, y: 22, label: 'COMPRESSION\nARTEFACT +0.12', side: 'left' },
    { x: 68, y: 35, label: 'GAN BLEND\nCOEFF 0.91', side: 'right' },
    { x: 50, y: 65, label: 'FREQ DIST\n∆σ 2.4', side: 'right' },
    { x: 24, y: 55, label: 'EYE BLINK\nCYCLE ERR', side: 'left' },
  ];

  const scores = [
    { model: 'Xception',       score: 0.912, active: tick >= 0 },
    { model: 'EfficientNet-B4', score: 0.876, active: tick >= 1 },
    { model: 'Ensemble fusion', score: 0.894, active: tick >= 2 },
  ];

  return (
    <div style={{
      border: `1px solid ${C.rule}`,
      borderRadius: radius.lg,
      background: C.bg0,
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    }}>
      {/* Header bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px',
        borderBottom: `1px solid ${C.rule}`,
        background: C.bg1,
      }}>
        <span style={{ fontFamily: font.mono, fontSize: 10, color: C.inkLow, letterSpacing: '0.08em' }}>
          FORENSIC REPORT #4A2F
        </span>
        <span style={{ fontFamily: font.mono, fontSize: 10, color: C.red, letterSpacing: '0.08em' }}>
          ● PROCESSING
        </span>
      </div>

      {/* Annotated image area */}
      <div style={{
        position: 'relative', background: C.bg2,
        height: 240, overflow: 'hidden',
      }}>
        {/* Face placeholder — grid overlay */}
        <svg
          width="100%" height="100%"
          viewBox="0 0 100 100" preserveAspectRatio="none"
          style={{ position: 'absolute', inset: 0, opacity: 0.15 }}
        >
          {/* Grid */}
          {[10,20,30,40,50,60,70,80,90].map(v => (
            <line key={`h${v}`} x1="0" y1={v} x2="100" y2={v} stroke={C.inkMid} strokeWidth="0.3"/>
          ))}
          {[10,20,30,40,50,60,70,80,90].map(v => (
            <line key={`v${v}`} x1={v} y1="0" x2={v} y2="100" stroke={C.inkMid} strokeWidth="0.3"/>
          ))}
        </svg>

        {/* Face oval placeholder */}
        <svg width="100%" height="100%" viewBox="0 0 300 240" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: 0 }}>
          {/* Face oval */}
          <ellipse cx="150" cy="115" rx="55" ry="68" stroke={C.inkMid} strokeWidth="1" fill="none" strokeDasharray="4 3"/>
          {/* Eyes */}
          <ellipse cx="132" cy="98" rx="10" ry="7" stroke={C.inkMid} strokeWidth="1" fill="none"/>
          <ellipse cx="168" cy="98" rx="10" ry="7" stroke={C.inkMid} strokeWidth="1" fill="none"/>
          {/* Nose */}
          <path d="M150 105 L143 125 L157 125" stroke={C.inkMid} strokeWidth="1" fill="none" strokeLinejoin="round"/>
          {/* Mouth */}
          <path d="M136 138 Q150 148 164 138" stroke={C.inkMid} strokeWidth="1" fill="none"/>

          {/* Annotation callouts */}
          {annotations.map((ann, i) => {
            const px = (ann.x / 100) * 300;
            const py = (ann.y / 100) * 240;
            const lineLen = 45;
            const x2 = ann.side === 'left' ? px - lineLen : px + lineLen;
            const isVisible = i <= tick;

            return (
              <g key={i} style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s' }}>
                {/* Dot */}
                <circle cx={px} cy={py} r="2.5" fill={C.red} opacity="0.8"/>
                {/* Line */}
                <line x1={px} y1={py} x2={x2} y2={py} stroke={C.red} strokeWidth="0.6" opacity="0.7"/>
                {/* Tick */}
                <line x1={x2} y1={py - 8} x2={x2} y2={py + 8} stroke={C.red} strokeWidth="0.6" opacity="0.7"/>
                {/* Label */}
                {ann.label.split('\n').map((line, li) => (
                  <text
                    key={li}
                    x={ann.side === 'left' ? x2 - 3 : x2 + 3}
                    y={py - 4 + li * 9}
                    textAnchor={ann.side === 'left' ? 'end' : 'start'}
                    fontSize="6" fill={C.red}
                    fontFamily="'Space Mono', monospace"
                    opacity="0.85"
                  >{line}</text>
                ))}
              </g>
            );
          })}

          {/* Scanning line */}
          <line
            x1="95" y1={40 + (tick * 40)} x2="205" y2={40 + (tick * 40)}
            stroke={C.red} strokeWidth="0.5" opacity="0.4"
            strokeDasharray="3 3"
          />
        </svg>
      </div>

      {/* Scores */}
      <div style={{ padding: '16px 18px' }}>
        {scores.map((s, i) => (
          <div key={i} style={{ marginBottom: i < scores.length - 1 ? 10 : 0 }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              marginBottom: 5, alignItems: 'center',
            }}>
              <span style={{ fontFamily: font.mono, fontSize: 10, color: C.inkMid, letterSpacing: '0.04em' }}>
                {s.model.toUpperCase()}
              </span>
              <span style={{
                fontFamily: font.mono, fontSize: 11, fontWeight: 700,
                color: s.active ? C.red : C.inkLow,
                transition: 'color 0.3s',
              }}>
                {s.active ? `${(s.score * 100).toFixed(1)}% FAKE` : '—'}
              </span>
            </div>
            <div style={{ height: 2, background: C.ruleDim, borderRadius: 1, overflow: 'hidden' }}>
              <div style={{
                width: s.active ? `${s.score * 100}%` : '0%',
                height: '100%', background: C.red, borderRadius: 1,
                transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
              }}/>
            </div>
          </div>
        ))}
      </div>

      {/* Verdict footer */}
      <div style={{
        margin: '0 18px 18px',
        padding: '10px 14px',
        background: C.redDim,
        border: `1px solid ${C.red}40`,
        borderRadius: radius.sm,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{
          fontFamily: font.mono, fontSize: 12, fontWeight: 700,
          color: C.red, letterSpacing: '0.1em',
        }}>⊘ DEEPFAKE DETECTED</span>
        <span style={{
          fontFamily: font.mono, fontSize: 10,
          color: C.inkMid, letterSpacing: '0.06em',
        }}>2,147 ms</span>
      </div>
    </div>
  );
}

// ─── Stats Rail ───────────────────────────────────────────────────────────────
function StatsRail() {
  const stats = [
    { val: '98.7%', label: 'Detection accuracy' },
    { val: '<3s',   label: 'Per-image analysis' },
    { val: '2',     label: 'Ensemble models' },
    { val: '0 KB',  label: 'Data retained' },
  ];

  return (
    <div style={{
      borderBottom: `1px solid ${C.rule}`,
      background: C.bg0,
    }}>
      <div style={{
        maxWidth: size.maxW, margin: '0 auto', padding: '0 24px',
        display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
      }}>
        {stats.map(({ val, label }, i) => (
          <div key={i} style={{
            padding: '32px 0',
            borderRight: i < stats.length - 1 ? `1px solid ${C.rule}` : 'none',
            paddingLeft: i > 0 ? 40 : 0,
          }}>
            <div style={{
              fontFamily: font.display, fontSize: 36, fontWeight: 700,
              color: C.ink, letterSpacing: '-0.03em', lineHeight: 1,
              marginBottom: 6,
            }}>{val}</div>
            <div style={{
              fontFamily: font.mono, fontSize: 11, color: C.inkLow,
              letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      n: '01',
      title: 'Upload',
      body: 'Drop a JPG, PNG, or MP4. Files are processed in-memory and never written to disk. Nothing leaves the analysis pipeline.',
    },
    {
      n: '02',
      title: 'Dual-model inference',
      body: 'Xception and EfficientNet-B4 each independently score the image across spatial and frequency domains.',
    },
    {
      n: '03',
      title: 'Ensemble fusion',
      body: 'A weighted average of both model scores produces a single confidence value. High confidence → definitive verdict.',
    },
    {
      n: '04',
      title: 'Heatmap',
      body: 'GradCAM++ localises the manipulated regions, highlighting exactly which pixels triggered the detection.',
    },
  ];

  return (
    <section id="how-it-works" style={{
      borderBottom: `1px solid ${C.rule}`,
      padding: '80px 0',
    }}>
      <div style={{ maxWidth: size.maxW, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginBottom: 56 }}>
          <span style={{
            fontFamily: font.mono, fontSize: 11, color: C.inkLow,
            letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>Process</span>
          <h2 style={{
            fontFamily: font.display, fontSize: 'clamp(28px,4vw,44px)',
            fontWeight: 700, color: C.ink, marginTop: 12,
            letterSpacing: '-0.03em',
          }}>How detection works</h2>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
          gap: 0,
          borderTop: `1px solid ${C.rule}`,
        }}>
          {steps.map((s, i) => (
            <div key={i} style={{
              padding: '32px 32px 32px 0',
              borderRight: i < steps.length - 1 ? `1px solid ${C.rule}` : 'none',
              paddingLeft: i > 0 ? 32 : 0,
            }}>
              <div style={{
                fontFamily: font.mono, fontSize: 11, color: C.red,
                letterSpacing: '0.06em', marginBottom: 20,
              }}>{s.n}</div>
              <h3 style={{
                fontFamily: font.display, fontSize: 16, fontWeight: 700,
                color: C.ink, letterSpacing: '-0.01em', marginBottom: 12,
              }}>{s.title}</h3>
              <p style={{
                fontSize: 13, color: C.inkMid, lineHeight: 1.65,
              }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Models ───────────────────────────────────────────────────────────────────
function Models() {
  const models = [
    {
      name: 'Xception',
      tag: 'SPATIAL ANALYSIS',
      stats: [
        { k: 'Architecture', v: 'Depthwise separable conv' },
        { k: 'Input size',   v: '299 × 299 px' },
        { k: 'Accuracy',     v: '97.9% on FF++' },
        { k: 'Params',       v: '22.9 M' },
      ],
      note: 'Captures spatial inconsistencies introduced by face-swap GAN generators.',
    },
    {
      name: 'EfficientNet-B4',
      tag: 'FREQUENCY ANALYSIS',
      stats: [
        { k: 'Architecture', v: 'Compound scaling' },
        { k: 'Input size',   v: '380 × 380 px' },
        { k: 'Accuracy',     v: '96.4% on FF++' },
        { k: 'Params',       v: '19.3 M' },
      ],
      note: 'Detects frequency-domain artefacts from neural texture synthesis.',
    },
  ];

  return (
    <section id="about" style={{
      borderBottom: `1px solid ${C.rule}`,
      padding: '80px 0',
    }}>
      <div style={{ maxWidth: size.maxW, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginBottom: 56 }}>
          <span style={{
            fontFamily: font.mono, fontSize: 11, color: C.inkLow,
            letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>Architecture</span>
          <h2 style={{
            fontFamily: font.display, fontSize: 'clamp(28px,4vw,44px)',
            fontWeight: 700, color: C.ink, marginTop: 12,
            letterSpacing: '-0.03em',
          }}>The models</h2>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24,
        }}>
          {models.map((m, i) => (
            <div key={i} style={{
              border: `1px solid ${C.rule}`,
              borderRadius: radius.lg,
              overflow: 'hidden',
            }}>
              <div style={{
                padding: '14px 20px',
                borderBottom: `1px solid ${C.rule}`,
                background: C.bg1,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{
                  fontFamily: font.display, fontSize: 14, fontWeight: 700,
                  color: C.ink, letterSpacing: '-0.01em',
                }}>{m.name}</span>
                <span style={{
                  fontFamily: font.mono, fontSize: 9, color: C.red,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  border: `1px solid ${C.red}40`, padding: '2px 6px',
                  borderRadius: 2,
                }}>{m.tag}</span>
              </div>

              <div style={{ padding: '20px' }}>
                {m.stats.map(({ k, v }) => (
                  <div key={k} style={{
                    display: 'flex', justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: `1px solid ${C.ruleDim}`,
                  }}>
                    <span style={{ fontFamily: font.mono, fontSize: 11, color: C.inkLow, letterSpacing: '0.04em' }}>
                      {k}
                    </span>
                    <span style={{ fontFamily: font.mono, fontSize: 11, color: C.ink, fontWeight: 700 }}>
                      {v}
                    </span>
                  </div>
                ))}
                <p style={{
                  fontSize: 13, color: C.inkMid, lineHeight: 1.6,
                  marginTop: 16, paddingTop: 16,
                  borderTop: `1px solid ${C.ruleDim}`,
                }}>{m.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}