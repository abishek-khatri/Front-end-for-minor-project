import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { C, font, radius } from "../styles/tokens";

const NAV_LINKS = [
  { label: "Product",      to: "/" },
  { label: "How It Works", to: "/#how-it-works" },
  { label: "About",        to: "/#about" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const isAuth = pathname === "/login" || pathname === "/signup";

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      height: 60,
      background: "rgba(6,9,15,0.88)",
      borderBottom: `1px solid ${C.border}`,
      backdropFilter: "blur(18px)",
      display: "flex", alignItems: "center",
    }}>
      <div style={{
        maxWidth: 1140, width: "100%", margin: "0 auto",
        padding: "0 24px",
        display: "flex", alignItems: "center", gap: 0,
      }}>
        {/* Wordmark */}
        <Link to="/" style={{
          textDecoration: "none", display: "flex",
          alignItems: "center", gap: 9, marginRight: "auto",
        }}>
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <rect width="26" height="26" rx="6" fill={C.cyan} fillOpacity="0.12"/>
            <circle cx="13" cy="13" r="6" stroke={C.cyan} strokeWidth="1.5"/>
            <circle cx="13" cy="13" r="2.5" fill={C.cyan}/>
            <line x1="13" y1="4" x2="13" y2="7" stroke={C.cyan} strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="13" y1="19" x2="13" y2="22" stroke={C.cyan} strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="4" y1="13" x2="7" y2="13" stroke={C.cyan} strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="19" y1="13" x2="22" y2="13" stroke={C.cyan} strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span style={{
            fontFamily: font.heading, fontSize: 17, fontWeight: 800,
            color: C.white, letterSpacing: "-0.02em",
          }}>
            Deep<span style={{ color: C.cyan }}>Sight</span>
          </span>
        </Link>

        {/* Nav links — hidden on auth pages */}
        {!isAuth && NAV_LINKS.map(l => (
          <Link key={l.label} to={l.to} style={{
            color: C.muted, fontSize: 14, fontWeight: 500,
            textDecoration: "none", padding: "0 16px", lineHeight: "60px",
            transition: "color 0.15s",
          }}
          onMouseEnter={e => e.target.style.color = C.white}
          onMouseLeave={e => e.target.style.color = C.muted}>
            {l.label}
          </Link>
        ))}

        {/* Auth buttons */}
        <div style={{ display: "flex", gap: 8, marginLeft: 16 }}>
          {pathname !== "/login" && (
            <Link to="/login" style={{
              padding: "7px 18px", borderRadius: radius.sm,
              border: `1px solid ${C.border}`, color: C.white,
              fontSize: 13, fontWeight: 600, textDecoration: "none",
              transition: "border-color 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = C.cyan + "60"}
            onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
              Log in
            </Link>
          )}
          {pathname !== "/signup" && (
            <Link to="/signup" style={{
              padding: "7px 18px", borderRadius: radius.sm,
              background: C.cyan, color: C.bg0,
              fontSize: 13, fontWeight: 700, textDecoration: "none",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
              Sign up free
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}