import { useState, useRef, useCallback } from "react";
import { C, font, radius } from "../styles/tokens";
import Navbar from "../components/Navbar";

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AnalyzePage() {
  const [stage, setStage] = useState("idle"); // idle | analyzing | result | error
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [url, setUrl] = useState("");

  const handleFile = (f) => {
    if (!f || !f.type.startsWith("image/")) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setStage("idle");
    setResult(null);
  };

  const analyze = async () => {
    if (!file && !url) return;
    setStage("analyzing");
    // TODO: POST to FastAPI /api/v1/analyze
    await new Promise((r) => setTimeout(r, 2800));
    setResult(MOCK_RESULT);
    setStage("result");
  };

  const reset = () => {
    setStage("idle");
    setFile(null);
    setPreview(null);
    setResult(null);
    setUrl("");
  };

  return (
    <div style={{ background: C.bg0, minHeight: "100vh", fontFamily: font.body }}>
      <Navbar />
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        padding: "88px 24px 60px",
      }}>
        {/* Page header */}
        <div style={{ marginBottom: 36 }}>
          <p style={{
            fontFamily: font.mono, fontSize: 11,
            color: C.cyan, letterSpacing: "0.12em",
            textTransform: "uppercase", margin: "0 0 8px",
          }}>DeepSight · Analyzer</p>
          <h1 style={{
            fontFamily: font.heading, fontSize: "clamp(24px,3vw,36px)",
            fontWeight: 800, color: C.white, margin: 0,
            letterSpacing: "-0.025em",
          }}>Analyze an image or video</h1>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: stage === "result" ? "1fr 1fr" : "1fr",
          gap: 24, alignItems: "start",
          maxWidth: stage === "result" ? "100%" : 680,
        }}>
          {/* Left panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <DropZone
              onFile={handleFile}
              preview={preview}
              file={file}
              onReset={reset}
            />
            <UrlInput url={url} onChange={setUrl} disabled={!!file} />
            <AnalyzeButton
              disabled={!file && !url}
              loading={stage === "analyzing"}
              onClick={analyze}
            />
            {stage === "analyzing" && <ProgressBar />}
          </div>

          {/* Right panel — result */}
          {stage === "result" && result && (
            <ResultPanel result={result} preview={preview} />
          )}
        </div>

        {/* Info strip */}
        {stage === "idle" && (
          <InfoStrip />
        )}
      </div>
    </div>
  );
}

// ─── Drop Zone ────────────────────────────────────────────────────────────────
function DropZone({ onFile, preview, file, onReset }) {
  const inputRef = useRef();
  const [dragging, setDragging] = useState(false);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) onFile(f);
  }, [onFile]);

  const onDrag = (e) => { e.preventDefault(); setDragging(true); };
  const onLeave = () => setDragging(false);

  if (preview && file) {
    return (
      <div style={{
        position: "relative",
        borderRadius: radius.md,
        overflow: "hidden",
        border: `1px solid ${C.faint}`,
      }}>
        <img
          src={preview} alt="preview"
          style={{ width: "100%", display: "block", maxHeight: 320, objectFit: "cover" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(6,9,15,0.85), transparent 40%)",
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          padding: 16,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <p style={{ fontFamily: font.mono, fontSize: 12, color: C.white, margin: "0 0 2px" }}>
                {file.name}
              </p>
              <p style={{ fontFamily: font.mono, fontSize: 11, color: C.muted, margin: 0 }}>
                {(file.size / 1024).toFixed(0)} KB · {file.type}
              </p>
            </div>
            <button onClick={onReset} style={{
              background: "rgba(232,57,74,0.15)",
              border: "1px solid rgba(232,57,74,0.3)",
              color: "#e8394a", borderRadius: radius.sm,
              padding: "5px 12px", fontSize: 12,
              cursor: "pointer", fontFamily: font.mono,
            }}>Remove</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDrag}
      onDragLeave={onLeave}
      onClick={() => inputRef.current?.click()}
      style={{
        border: `1.5px dashed ${dragging ? C.cyan : C.faint}`,
        borderRadius: radius.md,
        padding: "52px 24px",
        textAlign: "center",
        cursor: "pointer",
        background: dragging ? "rgba(0,212,255,0.04)" : "transparent",
        transition: "border-color 0.15s, background 0.15s",
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/mp4,video/quicktime"
        style={{ display: "none" }}
        onChange={(e) => onFile(e.target.files[0])}
      />

      {/* Upload icon */}
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ marginBottom: 14, opacity: 0.6 }}>
        <rect x="1" y="1" width="34" height="34" rx="8" stroke={C.cyan} strokeWidth="1.5"/>
        <path d="M18 24V12M12 18l6-6 6 6" stroke={C.cyan} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>

      <p style={{
        fontFamily: font.body, fontSize: 15, fontWeight: 600,
        color: C.white, margin: "0 0 6px",
      }}>
        {dragging ? "Drop it!" : "Drag & drop your image here"}
      </p>
      <p style={{ fontSize: 13, color: C.muted, margin: "0 0 16px" }}>
        JPG, PNG, WebP, MP4 · Max 50 MB
      </p>
      <button style={{
        padding: "8px 20px", borderRadius: radius.sm,
        background: "transparent", border: `1px solid ${C.border}`,
        color: C.cyan, fontSize: 13, cursor: "pointer",
        fontFamily: font.body, fontWeight: 600,
      }}>Browse files</button>
    </div>
  );
}

// ─── URL Input ────────────────────────────────────────────────────────────────
function UrlInput({ url, onChange, disabled }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{
        fontSize: 12, color: C.muted,
        fontFamily: font.mono, letterSpacing: "0.04em",
      }}>
        — or paste an image URL
      </label>
      <div style={{
        display: "flex", alignItems: "stretch",
        border: `1px solid ${focused ? C.border : C.faint}`,
        borderRadius: radius.sm,
        background: C.bg2, overflow: "hidden",
        opacity: disabled ? 0.45 : 1,
        transition: "border-color 0.15s",
      }}>
        <span style={{
          padding: "0 12px", display: "flex", alignItems: "center",
          fontFamily: font.mono, fontSize: 12, color: C.muted,
          borderRight: `1px solid ${C.faint}`, whiteSpace: "nowrap",
        }}>https://</span>
        <input
          type="url"
          value={url}
          onChange={(e) => onChange(e.target.value)}
          placeholder="example.com/image.jpg"
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1, background: "transparent", border: "none",
            outline: "none", padding: "11px 12px",
            color: C.white, fontSize: 13, fontFamily: font.mono,
          }}
        />
      </div>
    </div>
  );
}

// ─── Analyze Button ───────────────────────────────────────────────────────────
function AnalyzeButton({ disabled, loading, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        width: "100%", padding: "13px",
        borderRadius: radius.sm, border: "none",
        background: disabled || loading ? C.cyan + "50" : C.cyan,
        color: C.bg0, fontSize: 15, fontWeight: 700,
        cursor: disabled || loading ? "not-allowed" : "pointer",
        fontFamily: font.body, letterSpacing: "0.02em",
        transition: "background 0.15s",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      }}
    >
      {loading ? (
        <>
          <span style={{
            width: 16, height: 16, border: `2px solid ${C.bg0}`,
            borderTop: "2px solid transparent", borderRadius: "50%",
            display: "inline-block", animation: "spin 0.7s linear infinite",
          }}/>
          Analyzing…
        </>
      ) : "Run Analysis →"}
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </button>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar() {
  const steps = [
    "Uploading image…",
    "Running Xception model…",
    "Running EfficientNet-B4…",
    "Fusing ensemble outputs…",
    "Generating heatmap…",
  ];
  const [step, setStep] = useState(0);

  useState(() => {
    const id = setInterval(() => setStep((s) => Math.min(s + 1, steps.length - 1)), 560);
    return () => clearInterval(id);
  });

  return (
    <div style={{
      padding: "16px 18px",
      background: C.bg2,
      border: `1px solid ${C.faint}`,
      borderRadius: radius.sm,
    }}>
      <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
        {steps.map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 3, borderRadius: 2,
            background: i <= step ? C.cyan : C.faint,
            transition: "background 0.3s",
          }}/>
        ))}
      </div>
      <p style={{
        fontFamily: font.mono, fontSize: 12,
        color: C.cyan, margin: 0, letterSpacing: "0.04em",
      }}>{steps[step]}</p>
    </div>
  );
}

// ─── Result Panel ─────────────────────────────────────────────────────────────
function ResultPanel({ result, preview }) {
  const isF = result.verdict === "FAKE";
  const verdictColor = isF ? "#e8394a" : "#22c55e";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Verdict card */}
      <div style={{
        padding: "22px 24px",
        background: C.bg2,
        border: `1px solid ${verdictColor}30`,
        borderRadius: radius.md,
        borderTop: `3px solid ${verdictColor}`,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{
              fontFamily: font.mono, fontSize: 11, color: C.muted,
              textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 6px",
            }}>Verdict</p>
            <h2 style={{
              fontFamily: font.heading, fontSize: 36, fontWeight: 800,
              color: verdictColor, margin: 0, letterSpacing: "-0.03em",
            }}>{result.verdict}</h2>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{
              fontFamily: font.mono, fontSize: 11, color: C.muted,
              textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 6px",
            }}>Confidence</p>
            <p style={{
              fontFamily: font.heading, fontSize: 28, fontWeight: 800,
              color: C.white, margin: 0, letterSpacing: "-0.02em",
            }}>{(result.confidence * 100).toFixed(1)}%</p>
          </div>
        </div>

        {/* Ensemble bar */}
        <div style={{ marginTop: 18, height: 8, background: C.bg3, borderRadius: 4, overflow: "hidden" }}>
          <div style={{
            width: `${result.confidence * 100}%`,
            height: "100%", background: verdictColor, borderRadius: 4,
            transition: "width 0.8s ease",
          }}/>
        </div>
      </div>

      {/* Per-model scores */}
      <div style={{
        padding: "20px 24px",
        background: C.bg2,
        border: `1px solid ${C.faint}`,
        borderRadius: radius.md,
      }}>
        <p style={{
          fontFamily: font.mono, fontSize: 11, color: C.muted,
          textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 16px",
        }}>Model Breakdown</p>
        {Object.entries(result.scores).map(([model, score]) => (
          <ModelRow key={model} model={model} score={score} />
        ))}
      </div>

      {/* Meta row */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: 12,
      }}>
        <MetaCard label="Analysis time" value={`${result.analysis_ms.toLocaleString()} ms`}/>
        <MetaCard label="Model version" value={result.model_version}/>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 10 }}>
        <button style={{
          flex: 1, padding: "11px", borderRadius: radius.sm,
          background: C.bg2, border: `1px solid ${C.faint}`,
          color: C.white, fontSize: 13, cursor: "pointer",
          fontFamily: font.body, transition: "border-color 0.15s",
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = C.border}
        onMouseLeave={e => e.currentTarget.style.borderColor = C.faint}
        >
          Download JSON
        </button>
        <button style={{
          flex: 1, padding: "11px", borderRadius: radius.sm,
          background: C.cyan, border: "none",
          color: C.bg0, fontSize: 13, cursor: "pointer",
          fontFamily: font.body, fontWeight: 700,
        }}>
          View Heatmap
        </button>
      </div>
    </div>
  );
}

function ModelRow({ model, score }) {
  const pct = (score * 100).toFixed(1);
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontFamily: font.mono, fontSize: 12, color: C.muted }}>{model}</span>
        <span style={{ fontFamily: font.mono, fontSize: 12, color: C.cyan, fontWeight: 700 }}>
          {pct}%
        </span>
      </div>
      <div style={{ height: 4, background: C.bg3, borderRadius: 2, overflow: "hidden" }}>
        <div style={{
          width: `${pct}%`, height: "100%",
          background: C.cyan, borderRadius: 2, opacity: 0.8,
        }}/>
      </div>
    </div>
  );
}

function MetaCard({ label, value }) {
  return (
    <div style={{
      padding: "14px 16px",
      background: C.bg2,
      border: `1px solid ${C.faint}`,
      borderRadius: radius.sm,
    }}>
      <p style={{ fontFamily: font.mono, fontSize: 10, color: C.muted, margin: "0 0 4px", letterSpacing: "0.08em" }}>
        {label}
      </p>
      <p style={{ fontFamily: font.mono, fontSize: 14, color: C.white, margin: 0, fontWeight: 600 }}>
        {value}
      </p>
    </div>
  );
}

function InfoStrip() {
  return (
    <div style={{
      marginTop: 40, display: "flex", gap: 0,
      border: `1px solid ${C.faint}`, borderRadius: radius.md,
      overflow: "hidden", maxWidth: 680,
    }}>
      {[
        { label: "50 free analyses/mo", note: "no signup needed" },
        { label: "Processed in-memory", note: "nothing stored" },
        { label: "2 AI models", note: "Xception + EfficientNet" },
      ].map(({ label, note }, i, arr) => (
        <div key={i} style={{
          flex: 1, padding: "14px 18px",
          borderRight: i < arr.length - 1 ? `1px solid ${C.faint}` : "none",
        }}>
          <p style={{ fontFamily: font.mono, fontSize: 12, color: C.white, margin: "0 0 2px", fontWeight: 600 }}>
            {label}
          </p>
          <p style={{ fontFamily: font.mono, fontSize: 11, color: C.muted, margin: 0 }}>{note}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Mock result (replace with real API response) ─────────────────────────────
const MOCK_RESULT = {
  verdict: "FAKE",
  confidence: 0.894,
  scores: {
    "xception":     0.912,
    "efficientnet": 0.876,
  },
  heatmap_url: "https://api.deepsight.io/heatmaps/req_demo.png",
  analysis_ms: 2147,
  model_version: "ensemble-v2.1",
};