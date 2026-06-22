import { useState } from "react";
import { Link } from "react-router-dom";
import { C, font, radius } from "../styles/tokens";
import Navbar from "../components/Navbar";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    // TODO: connect to your FastAPI /auth/login endpoint
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    // navigate("/analyze") after real auth
    setError("Demo mode — backend not connected.");
  };

  return (
    <div style={{ background: C.bg0, minHeight: "100vh", fontFamily: font.body }}>
      <Navbar />
      <AuthLayout
        title="Welcome back"
        sub="Log in to your DeepSight account"
        footer={<>No account? <Link to="/signup" style={linkStyle}>Sign up free →</Link></>}
      >
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          <Field label="Email address">
            <Input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={set("email")}
              autoComplete="email"
            />
          </Field>

          <Field label="Password">
            <div style={{ position: "relative" }}>
              <Input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={set("password")}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                style={{
                  position: "absolute", right: 12, top: "50%",
                  transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  color: C.muted, fontSize: 12, fontFamily: font.mono,
                  padding: 0,
                }}
              >{showPass ? "hide" : "show"}</button>
            </div>
          </Field>

          <div style={{ textAlign: "right", marginTop: -8 }}>
            <a href="#" style={{ ...linkStyle, fontSize: 13 }}>Forgot password?</a>
          </div>

          {error && <ErrorMsg msg={error} />}

          <SubmitBtn loading={loading} label="Log in" />

          <Divider />

          <GoogleBtn label="Continue with Google" />
        </form>
      </AuthLayout>
    </div>
  );
}

// ─── Shared Auth pieces ───────────────────────────────────────────────────────

function AuthLayout({ title, sub, children, footer }) {
  return (
    <div style={{
      minHeight: "100vh", display: "flex",
      alignItems: "center", justifyContent: "center",
      padding: "80px 24px 40px",
    }}>
      <div style={{
        width: "100%", maxWidth: 420,
      }}>
        {/* Brand mark */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ marginBottom: 14 }}>
            <rect width="40" height="40" rx="10" fill={C.cyan} fillOpacity="0.1"/>
            <circle cx="20" cy="20" r="9" stroke={C.cyan} strokeWidth="1.5"/>
            <circle cx="20" cy="20" r="3.5" fill={C.cyan}/>
            <line x1="20" y1="8" x2="20" y2="11" stroke={C.cyan} strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="20" y1="29" x2="20" y2="32" stroke={C.cyan} strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="8"  y1="20" x2="11" y2="20" stroke={C.cyan} strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="29" y1="20" x2="32" y2="20" stroke={C.cyan} strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <h1 style={{
            fontFamily: font.heading, fontSize: 24, fontWeight: 800,
            color: C.white, margin: "0 0 6px", letterSpacing: "-0.02em",
          }}>{title}</h1>
          <p style={{ fontSize: 14, color: C.muted, margin: 0 }}>{sub}</p>
        </div>

        {/* Card */}
        <div style={{
          background: C.bg2,
          border: `1px solid ${C.faint}`,
          borderRadius: radius.lg,
          padding: "28px 28px 24px",
        }}>
          {children}
        </div>

        {/* Footer */}
        <p style={{
          textAlign: "center", fontSize: 13, color: C.muted,
          marginTop: 20, fontFamily: font.body,
        }}>{footer}</p>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <label style={{
        fontSize: 13, fontWeight: 600, color: C.white,
        fontFamily: font.body, letterSpacing: "0.01em",
      }}>{label}</label>
      {children}
    </div>
  );
}

function Input({ style, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      {...props}
      onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
      onBlur={(e)  => { setFocused(false); props.onBlur?.(e); }}
      style={{
        width: "100%", boxSizing: "border-box",
        padding: "11px 14px", borderRadius: radius.sm,
        background: C.bg3,
        border: `1px solid ${focused ? C.cyan + "55" : C.faint}`,
        color: C.white, fontSize: 14, fontFamily: font.mono,
        outline: "none", transition: "border-color 0.15s",
        ...style,
      }}
    />
  );
}

function SubmitBtn({ loading, label }) {
  return (
    <button
      type="submit"
      disabled={loading}
      style={{
        width: "100%", padding: "12px", borderRadius: radius.sm,
        background: loading ? C.cyan + "70" : C.cyan,
        border: "none", color: C.bg0,
        fontSize: 14, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
        fontFamily: font.body, letterSpacing: "0.02em",
        transition: "background 0.15s",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      }}
    >
      {loading && (
        <span style={{
          width: 14, height: 14, border: `2px solid ${C.bg0}`,
          borderTop: "2px solid transparent", borderRadius: "50%",
          display: "inline-block", animation: "spin 0.7s linear infinite",
        }}/>
      )}
      {loading ? "Logging in…" : label}
    </button>
  );
}

function GoogleBtn({ label }) {
  return (
    <button
      type="button"
      style={{
        width: "100%", padding: "11px", borderRadius: radius.sm,
        background: "transparent", border: `1px solid ${C.faint}`,
        color: C.white, fontSize: 14, cursor: "pointer",
        fontFamily: font.body, display: "flex",
        alignItems: "center", justifyContent: "center", gap: 10,
        transition: "border-color 0.15s",
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = C.border}
      onMouseLeave={e => e.currentTarget.style.borderColor = C.faint}
    >
      <svg width="16" height="16" viewBox="0 0 48 48" fill="none">
        <path fill="#FFC107" d="M43.6 20.2H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.5 6.6 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8.9 20-20 0-1.3-.1-2.5-.4-3.8z"/>
        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.5 6.6 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
        <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.4 35.5 26.8 36 24 36c-5.2 0-9.7-3.3-11.3-8H6.3C9.6 35.6 16.3 44 24 44z"/>
        <path fill="#1976D2" d="M43.6 20.2H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6.2 5.2C37 39.1 44 34 44 24c0-1.3-.1-2.5-.4-3.8z"/>
      </svg>
      {label}
    </button>
  );
}

function Divider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ flex: 1, height: 1, background: C.faint }}/>
      <span style={{ fontSize: 12, color: C.muted, fontFamily: font.mono }}>or</span>
      <div style={{ flex: 1, height: 1, background: C.faint }}/>
    </div>
  );
}

function ErrorMsg({ msg }) {
  return (
    <div style={{
      padding: "10px 14px", borderRadius: radius.sm,
      background: "rgba(232,57,74,0.10)",
      border: `1px solid rgba(232,57,74,0.28)`,
      fontSize: 13, color: "#e8394a", fontFamily: font.body,
    }}>{msg}</div>
  );
}

const linkStyle = {
  color: C.cyan, textDecoration: "none", fontWeight: 600,
};

export { AuthLayout, Field, Input, SubmitBtn, GoogleBtn, Divider, ErrorMsg, linkStyle };