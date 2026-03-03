import { useQueryClient } from "@tanstack/react-query";
import { Loader2, LogIn, LogOut, Menu, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Videos", href: "#videos" },
  { label: "Formulas", href: "#formulas" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: unknown) {
        const err = error as Error;
        if (err?.message === "User is already authenticated") {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-nav-bg/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavClick("#home")}
            className="flex items-center gap-3 group"
            aria-label="Go to top"
          >
            <div className="w-11 h-11 md:w-13 md:h-13 rounded-full overflow-hidden ring-2 ring-brand-fire/70 shadow-md shadow-brand-fire/40 flex-shrink-0 group-hover:ring-brand-fire transition-all duration-200">
              <img
                src="/assets/generated/topper-ignite-logo.dim_200x200.png"
                alt="Topper Ignite Logo"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-heading font-black text-base text-white tracking-tight">
                TOPPER
              </span>
              <span className="font-heading font-black text-base text-brand-fire tracking-widest -mt-0.5">
                IGNITE
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.href}
                data-ocid={
                  link.href === "#formulas" ? "nav.formulas_link" : undefined
                }
                onClick={() => handleNavClick(link.href)}
                className="px-5 py-2 rounded-full text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://www.youtube.com/@TopperIgnite"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-5 py-2 rounded-full bg-brand-fire text-white text-sm font-bold hover:bg-brand-ember transition-all duration-200 shadow-md shadow-brand-fire/30 hover:shadow-brand-fire/50"
            >
              Subscribe Now
            </a>

            {/* Login / Logout button */}
            <button
              type="button"
              data-ocid={
                isAuthenticated ? "nav.logout_button" : "nav.login_button"
              }
              onClick={handleAuth}
              disabled={isLoggingIn}
              className={`ml-2 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 disabled:opacity-50 ${
                isAuthenticated
                  ? "bg-white/10 border border-white/20 text-white/80 hover:bg-white/20 hover:text-white"
                  : "bg-white/10 border border-brand-fire/40 text-brand-fire hover:bg-brand-fire hover:text-white hover:border-brand-fire"
              }`}
            >
              {isLoggingIn ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : isAuthenticated ? (
                <>
                  <User className="w-4 h-4" />
                  <LogOut className="w-4 h-4" />
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </>
              )}
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-nav-bg/98 backdrop-blur-md rounded-2xl mb-4 p-4 flex flex-col gap-2 border border-white/10">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.href}
                data-ocid={
                  link.href === "#formulas" ? "nav.formulas_link" : undefined
                }
                onClick={() => handleNavClick(link.href)}
                className="w-full text-left px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 font-semibold transition-all"
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://www.youtube.com/@TopperIgnite"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 px-4 py-3 rounded-xl bg-brand-fire text-white font-bold text-center hover:bg-brand-ember transition-all"
            >
              Subscribe Now
            </a>

            {/* Mobile Login / Logout */}
            <button
              type="button"
              data-ocid={
                isAuthenticated ? "nav.logout_button" : "nav.login_button"
              }
              onClick={handleAuth}
              disabled={isLoggingIn}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold transition-all disabled:opacity-50 ${
                isAuthenticated
                  ? "bg-white/10 border border-white/20 text-white/80"
                  : "bg-brand-fire/15 border border-brand-fire/30 text-brand-fire"
              }`}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Login ho raha hai...</span>
                </>
              ) : isAuthenticated ? (
                <>
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </>
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
