import { ChevronDown, Play, Youtube } from "lucide-react";

export default function Hero() {
  const handleScrollToVideos = () => {
    const el = document.querySelector("#videos");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/hero-banner.dim_1440x500.png"
          alt="Hero Background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-site-bg/70 via-site-bg/50 to-site-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-site-bg/80 via-transparent to-site-bg/80" />
      </div>

      {/* Animated background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-fire/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-ember/15 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-brand-fire/20 border border-brand-fire/40 rounded-full px-4 py-2 mb-6">
          <span className="w-2 h-2 bg-brand-fire rounded-full animate-pulse" />
          <span className="text-brand-fire text-sm font-semibold tracking-wide uppercase">
            Class 12 Mathematics
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="font-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-none mb-4">
          TOPPER
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-fire via-brand-gold to-brand-ember">
            IGNITE
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-xl sm:text-2xl md:text-3xl text-white/80 font-semibold mb-4 max-w-3xl mx-auto leading-snug">
          Master Class 12 Math with{" "}
          <span className="text-brand-gold">clarity, confidence</span> and{" "}
          <span className="text-brand-fire">passion</span>
        </p>

        <p className="text-base sm:text-lg text-white/60 mb-10 max-w-2xl mx-auto">
          Free video lectures covering the complete CBSE Class 12 Mathematics
          syllabus — from Relations & Functions to Probability. Learn smart,
          score high!
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://www.youtube.com/@TopperIgnite"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-brand-fire hover:bg-brand-ember text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl shadow-brand-fire/30 hover:shadow-brand-fire/50 hover:scale-105"
          >
            <Youtube className="w-6 h-6" />
            Visit YouTube Channel
          </a>
          <button
            type="button"
            onClick={handleScrollToVideos}
            className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all duration-300 backdrop-blur-sm hover:scale-105"
          >
            <Play className="w-5 h-5 fill-white" />
            Watch Videos
          </button>
        </div>

        {/* Scroll indicator */}
        <button
          type="button"
          onClick={handleScrollToVideos}
          className="mt-16 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors mx-auto"
        >
          <span className="text-xs uppercase tracking-widest">Scroll Down</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>
    </div>
  );
}
