import { Heart, Lightbulb, Target, Trophy } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Exam-Focused Teaching",
    description:
      "Every concept is taught with RBSC NCERT board exams in mind — important questions, marking schemes, and shortcuts.",
  },
  {
    icon: Lightbulb,
    title: "Concept Clarity First",
    description:
      "We believe in building strong fundamentals before moving to complex problems. No rote learning!",
  },
  {
    icon: Trophy,
    title: "Proven Results",
    description:
      "Thousands of students have scored 90+ in Class 12 Math after following our structured video series.",
  },
  {
    icon: Heart,
    title: "Free for Everyone",
    description:
      "Quality education should be accessible to all. All our videos are completely free on YouTube.",
  },
];

const chapters = [
  "Relations & Functions",
  "Inverse Trig Functions",
  "Matrices",
  "Determinants",
  "Continuity & Differentiability",
  "Application of Derivatives",
  "Integrals",
  "Application of Integrals",
  "Differential Equations",
  "Vector Algebra",
  "3D Geometry",
  "Linear Programming",
  "Probability",
];

export default function About() {
  return (
    <section className="py-20 bg-gradient-to-b from-site-surface to-site-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-teal/15 border border-brand-teal/30 rounded-full px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-brand-teal rounded-full" />
            <span className="text-brand-teal text-sm font-semibold uppercase tracking-wide">
              About the Channel
            </span>
          </div>
          <h2 className="font-heading font-black text-4xl sm:text-5xl text-white mb-4">
            Why{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-fire to-brand-gold">
              Topper Ignite?
            </span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            A dedicated YouTube channel helping Class 12 students conquer
            Mathematics with confidence and clarity.
          </p>
        </div>

        {/* Main About Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left: Text */}
          <div>
            <h3 className="font-heading font-black text-3xl text-white mb-6 leading-tight">
              Igniting the{" "}
              <span className="text-brand-fire">spark of learning</span> in
              every student
            </h3>
            <div className="space-y-4 text-white/70 text-base leading-relaxed">
              <p>
                <strong className="text-white">Topper Ignite</strong> is a
                YouTube channel dedicated to making Class 12 Mathematics simple,
                engaging, and effective. We cover the complete RBSC NCERT
                syllabus through well-structured video lectures that are easy to
                follow.
              </p>
              <p>
                Our teaching approach focuses on building conceptual
                understanding first, then applying it to solve board-level and
                competitive exam problems. Whether you're struggling with
                Calculus or Vectors, we've got you covered.
              </p>
              <p>
                Join thousands of students who have transformed their Math
                scores by learning with Topper Ignite. Subscribe to our channel
                and never miss a new lecture!
              </p>
            </div>
            <div className="mt-8">
              <a
                href="https://www.youtube.com/@TopperIgnite"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-brand-fire hover:bg-brand-ember text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-brand-fire/30 hover:scale-105"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  role="img"
                  aria-label="YouTube"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                Subscribe on YouTube
              </a>
            </div>
          </div>

          {/* Right: Chapters List */}
          <div className="bg-site-card border border-white/10 rounded-3xl p-8">
            <h4 className="font-heading font-bold text-white text-xl mb-6 flex items-center gap-2">
              <span className="w-3 h-3 bg-brand-fire rounded-full" />
              Complete Syllabus Coverage
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {chapters.map((chapter, index) => (
                <div
                  key={chapter}
                  className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0"
                >
                  <span className="w-7 h-7 bg-brand-fire/20 text-brand-fire text-xs font-bold rounded-lg flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-white/80 text-sm font-medium">
                    {chapter}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-site-card border border-white/10 rounded-2xl p-6 hover:border-brand-fire/30 transition-all duration-300 hover:shadow-lg hover:shadow-brand-fire/10 group"
              >
                <div className="w-12 h-12 bg-brand-fire/15 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-fire/25 transition-colors">
                  <Icon className="w-6 h-6 text-brand-fire" />
                </div>
                <h4 className="font-heading font-bold text-white text-base mb-2">
                  {feature.title}
                </h4>
                <p className="text-white/55 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
