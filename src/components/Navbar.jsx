import { Link, useLocation } from 'react-router-dom';
import { C, font, size } from '../styles/tokens';

const NAV = [
  { label: 'How it works', to: '/#how-it-works' },
  { label: 'About',        to: '/#about' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const isAuth = pathname === '/login' || pathname === '/signup';

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      height: size.navH,
      background: 'rgba(247,246,243,0.92)',
      borderBottom: `1px solid ${C.rule}`,
      backdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'center',
    }}>
      <div style={{
        maxWidth: size.maxW, width: '100%', margin: '0 auto',
        padding: '0 24px',
        display: 'flex', alignItems: 'center',
      }}>
        {/* Wordmark */}
        <Link to="/" style={{
          textDecoration: 'none', display: 'flex',
          alignItems: 'center', gap: 10, marginRight: 'auto',
        }}>
          {/* Crosshair mark */}
          <div style={{ position: 'relative', width: 18, height: 18 }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="4" stroke={C.red} strokeWidth="1.25"/>
              <line x1="9" y1="0" x2="9" y2="5" stroke={C.red} strokeWidth="1.25"/>
              <line x1="9" y1="13" x2="9" y2="18" stroke={C.red} strokeWidth="1.25"/>
              <line x1="0" y1="9" x2="5" y2="9" stroke={C.red} strokeWidth="1.25"/>
              <line x1="13" y1="9" x2="18" y2="9" stroke={C.red} strokeWidth="1.25"/>
              <circle cx="9" cy="9" r="1.5" fill={C.red}/>
            </svg>
          </div>
          <span style={{
            fontFamily: font.display, fontSize: 14, fontWeight: 700,
            color: C.ink, letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}>
            Deep<span style={{ color: C.red }}>Sight</span>
          </span>
        </Link>

        {/* Nav links */}
        {!isAuth && NAV.map(l => (
          <Link key={l.label} to={l.to} style={{
            fontFamily: font.mono, fontSize: 11, color: C.inkLow,
            textDecoration: 'none', padding: '0 18px', lineHeight: `${size.navH}px`,
            letterSpacing: '0.04em', textTransform: 'uppercase',
            transition: 'color 0.1s',
          }}
          onMouseEnter={e => e.target.style.color = C.ink}
          onMouseLeave={e => e.target.style.color = C.inkLow}>
            {l.label}
          </Link>
        ))}

        {/* Auth buttons */}
        {!isAuth && (
          <div style={{ display: 'flex', gap: 8, marginLeft: 8 }}>
            <Link to="/login" style={{
              fontFamily: font.mono, fontSize: 11, letterSpacing: '0.04em',
              textTransform: 'uppercase',
              padding: '7px 16px', border: `1px solid ${C.rule}`,
              color: C.inkMid, textDecoration: 'none', borderRadius: 2,
              transition: 'border-color 0.1s, color 0.1s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.ink; e.currentTarget.style.color = C.ink; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.rule; e.currentTarget.style.color = C.inkMid; }}>
              Log in
            </Link>
            <Link to="/analyze" style={{
              fontFamily: font.mono, fontSize: 11, letterSpacing: '0.04em',
              textTransform: 'uppercase',
              padding: '7px 16px',
              background: C.ink, color: C.white,
              textDecoration: 'none', borderRadius: 2,
              border: `1px solid ${C.ink}`,
              transition: 'background 0.1s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = C.red; e.currentTarget.style.borderColor = C.red; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.ink; e.currentTarget.style.borderColor = C.ink; }}>
              Analyze →
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}