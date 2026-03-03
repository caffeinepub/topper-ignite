import { SiInstagram, SiYoutube } from "react-icons/si";

const currentYear = new Date().getFullYear();
const appId = encodeURIComponent(
  typeof window !== "undefined" ? window.location.hostname : "topper-ignite",
);

export default function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-site-footer border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-brand-fire/60 shadow-md shadow-brand-fire/30 flex-shrink-0">
                <img
                  src="/assets/generated/topper-ignite-logo.dim_200x200.png"
                  alt="Topper Ignite Logo"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-heading font-black text-lg text-white tracking-tight">
                  TOPPER
                </span>
                <span className="font-heading font-black text-lg text-brand-fire tracking-widest -mt-1">
                  IGNITE
                </span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Your go-to YouTube channel for Class 12 Mathematics. Free, clear,
              and exam-focused video lectures.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://www.youtube.com/@TopperIgnite"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-brand-fire rounded-lg flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <SiYoutube className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://www.instagram.com/topperignite"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-brand-fire rounded-lg flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <SiInstagram className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-widest mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "#home" },
                { label: "Video Lectures", href: "#videos" },
                { label: "About Us", href: "#about" },
              ].map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(link.href)}
                    className="text-white/50 hover:text-brand-fire text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="https://www.youtube.com/@TopperIgnite"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-brand-fire text-sm transition-colors"
                >
                  YouTube Channel
                </a>
              </li>
            </ul>
          </div>

          {/* Chapters */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-widest mb-4">
              Topics Covered
            </h4>
            <ul className="space-y-2">
              {[
                "Relations & Functions",
                "Matrices & Determinants",
                "Calculus (Diff. & Integral)",
                "Vector Algebra",
                "3D Geometry",
                "Probability",
              ].map((topic) => (
                <li
                  key={topic}
                  className="text-white/50 text-sm flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-brand-fire/60 rounded-full flex-shrink-0" />
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-sm">
            © {currentYear} Topper Ignite. All rights reserved.
          </p>
          <p className="text-white/30 text-sm flex items-center gap-1">
            Built with <span className="text-brand-fire">♥</span> using{" "}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-fire hover:text-brand-gold transition-colors font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
