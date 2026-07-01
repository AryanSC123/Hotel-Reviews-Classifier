import { NavLink } from "react-router-dom";

export default function Navbar() {
  // Clean, reusable utility class generator for the links
  const linkStyles = ({ isActive }) =>
    `font-mono text-xs uppercase tracking-wider font-bold transition-all duration-150 py-1 border-b-2 ${
      isActive
        ? "text-black border-black"
        : "text-zinc-400 border-transparent hover:text-black"
    }`;

  return (
    <nav className="w-full bg-white border-b border-zinc-200 sticky top-0 z-50 px-6 sm:px-12 py-5 flex items-center justify-between">
      {/* Editorial System Identifier */}
      <NavLink
        to="/"
        className="text-lg font-black font-mono tracking-tighter uppercase text-zinc-900 hover:opacity-80 transition-opacity"
      >
        ML_CORE <span className="text-zinc-300 font-light">//</span>
      </NavLink>

      {/* Navigation Registry Links */}
      <div className="flex items-center gap-6 sm:gap-8">
        <NavLink to="/" className={linkStyles}>
          Overview
        </NavLink>

        <NavLink to="/analytics" className={linkStyles}>
          Analytics
        </NavLink>

        <NavLink to="/playground" className={linkStyles}>
          Playground
        </NavLink>
      </div>
    </nav>
  );
}
