import { useState } from "react";
import { Link } from "react-router-dom";
import { C, font, radius } from "../styles/tokens";
import Navbar from "../components/Navbar";
import {
  AuthLayout, Field, Input, SubmitBtn, GoogleBtn,
  Divider, ErrorMsg, linkStyle,
} from "./LoginPage";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const passwordStrength = (pw) => {
    if (!pw) return { score: 0, label: "", color: "transparent" };
    const checks = [/.{8,}/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/];
    const score = checks.filter((r) => r.test(pw)).length;
    return {
      score,
      label: ["", "Weak", "Fair", "Good", "Strong"][score],
      color: ["transparent", "#e8394a", "#f59e0b", "#3b82f6", "#22c55e"][score],
    };
  };

  const strength = passwordStrength(form.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (strength.score < 2) {
      setError("Password is too weak. Add uppercase letters, numbers, or symbols.");
      return;
    }
    setLoading(true);
    // TODO: connect to your FastAPI /auth/register endpoint
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setDone(true);
  };

  if (done) return <SuccessScreen name={form.name} />;

  return (
    <div style={{ background: C.bg0, minHeight: "100vh", fontFamily: font.body }}>
      <Navbar />
      <AuthLayout
        title="Create your account"
        sub="Start detecting deepfakes — free, no credit card"
        footer={<>Already have an account? <Link to="/login" style={linkStyle}>Log in →</Link></>}
      >
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          <Field label="Full name">
            <Input
              type="text"
              placeholder="Abishek Pokharel"
              value={form.name}
              onChange={set("name")}
              autoComplete="name"
            />
          </Field>

          <Field label="Email address">
            <Input
              type="email"
              placeholder="you@jec.edu.np"
              value={form.email}
              onChange={set("email")}
              autoComplete="email"
            />
          </Field>

          <Field label="Password">
            <Input
              type="password"
              placeholder="at least 8 characters"
              value={form.password}
              onChange={set("password")}
              autoComplete="new-password"
            />
            {/* Strength meter */}
            {form.password && (
              <div>
                <div style={{
                  display: "flex", gap: 4, marginTop: 8,
                }}>
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} style={{
                      flex: 1, height: 3, borderRadius: 2,
                      background: i <= strength.score ? strength.color : C.faint,
                      transition: "background 0.2s",
                    }}/>
                  ))}
                </div>
                <p style={{
                  fontFamily: font.mono, fontSize: 11,
                  color: strength.color, margin: "5px 0 0",
                  letterSpacing: "0.06em",
                }}>{strength.label}</p>
              </div>
            )}
          </Field>

          <Field label="Confirm password">
            <Input
              type="password"
              placeholder="repeat password"
              value={form.confirm}
              onChange={set("confirm")}
              autoComplete="new-password"
              style={
                form.confirm
                  ? { borderColor: form.confirm === form.password ? "#22c55e55" : "#e8394a55" }
                  : {}
              }
            />
          </Field>

          {/* Terms */}
          <p style={{
            fontSize: 12, color: C.muted, margin: 0,
            lineHeight: 1.6, fontFamily: font.body,
          }}>
            By creating an account you agree to our{" "}
            <a href="#" style={{ color: C.cyan, textDecoration: "none" }}>Terms of Service</a>
            {" "}and{" "}
            <a href="#" style={{ color: C.cyan, textDecoration: "none" }}>Privacy Policy</a>.
          </p>

          {error && <ErrorMsg msg={error} />}

          <SubmitBtn loading={loading} label="Create account" />

          <Divider />

          <GoogleBtn label="Sign up with Google" />
        </form>
      </AuthLayout>
    </div>
  );
}

function SuccessScreen({ name }) {
  return (
    <div style={{
      background: C.bg0, minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: font.body, padding: 24,
    }}>
      <div style={{ textAlign: "center", maxWidth: 400 }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%",
          background: "rgba(34,197,94,0.12)",
          border: "1px solid rgba(34,197,94,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px",
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 12l5 5L19 7" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 style={{
          fontFamily: font.heading, fontSize: 24, fontWeight: 800,
          color: C.white, margin: "0 0 10px", letterSpacing: "-0.02em",
        }}>You're in, {name.split(" ")[0]}!</h2>
        <p style={{ fontSize: 15, color: C.muted, margin: "0 0 28px", lineHeight: 1.6 }}>
          Check your email to confirm your account, then start analyzing.
        </p>
        <Link to="/analyze" style={{
          padding: "12px 28px", borderRadius: radius.sm,
          background: C.cyan, color: C.bg0, fontWeight: 700,
          fontSize: 14, textDecoration: "none",
        }}>Open Analyzer →</Link>
      </div>
    </div>
  );
}