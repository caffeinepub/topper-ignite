import { ExternalLink, Play } from "lucide-react";
import { useState } from "react";

interface VideoItem {
  id: string;
  title: string;
  description: string;
  chapter: string;
  youtubeId: string;
}

const videos: VideoItem[] = [
  {
    id: "1",
    title: "Relations and Functions – Complete Chapter",
    description:
      "Master the concepts of relations, types of functions, and their properties for Class 12.",
    chapter: "Chapter 1",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "2",
    title: "Inverse Trigonometric Functions",
    description:
      "Learn all inverse trig functions, their domains, ranges, and important formulas.",
    chapter: "Chapter 2",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "3",
    title: "Matrices – Introduction & Operations",
    description:
      "Understand matrix types, addition, multiplication, and transpose with solved examples.",
    chapter: "Chapter 3",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "4",
    title: "Determinants – Properties & Applications",
    description:
      "Explore determinant properties, cofactors, adjoint, and inverse of a matrix.",
    chapter: "Chapter 4",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "5",
    title: "Continuity and Differentiability",
    description:
      "Deep dive into continuity, differentiability, chain rule, and implicit differentiation.",
    chapter: "Chapter 5",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "6",
    title: "Application of Derivatives",
    description:
      "Rate of change, increasing/decreasing functions, maxima, minima, and tangents.",
    chapter: "Chapter 6",
    youtubeId: "dQw4w9WgXcQ",
  },
];

function VideoCard({ video }: { video: VideoItem }) {
  const [playing, setPlaying] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;

  return (
    <div className="bg-site-card border border-white/10 rounded-2xl overflow-hidden hover:border-brand-fire/40 transition-all duration-300 hover:shadow-xl hover:shadow-brand-fire/10 group flex flex-col">
      {/* Video Embed / Thumbnail */}
      <div className="relative aspect-video bg-black">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <button
            type="button"
            className="relative w-full h-full cursor-pointer p-0 border-0 bg-transparent"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${video.title}`}
          >
            <img
              src={thumbnailUrl}
              alt={video.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
              }}
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <div className="w-16 h-16 bg-brand-fire rounded-full flex items-center justify-center shadow-xl shadow-brand-fire/50 group-hover:scale-110 transition-transform">
                <Play className="w-7 h-7 text-white fill-white ml-1" />
              </div>
            </div>
            {/* Chapter badge */}
            <div className="absolute top-3 left-3 bg-brand-fire/90 text-white text-xs font-bold px-3 py-1 rounded-full">
              {video.chapter}
            </div>
          </button>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-heading font-bold text-white text-base leading-snug mb-2 group-hover:text-brand-gold transition-colors">
          {video.title}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed flex-1">
          {video.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="flex items-center gap-2 text-brand-fire hover:text-brand-gold text-sm font-semibold transition-colors"
          >
            <Play className="w-4 h-4 fill-current" />
            Watch Now
          </button>
          <a
            href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 hover:text-white/70 transition-colors"
            title="Open on YouTube"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Videos() {
  return (
    <section className="py-20 bg-site-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-brand-fire/15 border border-brand-fire/30 rounded-full px-4 py-2 mb-4">
            <Play className="w-4 h-4 text-brand-fire fill-brand-fire" />
            <span className="text-brand-fire text-sm font-semibold uppercase tracking-wide">
              Featured Lectures
            </span>
          </div>
          <h2 className="font-heading font-black text-4xl sm:text-5xl text-white mb-4">
            Class 12 Math{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-fire to-brand-gold">
              Video Lectures
            </span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Comprehensive video lectures covering the entire CBSE Class 12
            Mathematics syllabus. Clear explanations, solved examples, and
            exam-focused content.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="https://www.youtube.com/@TopperIgnite"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-brand-fire to-brand-ember text-white font-bold text-lg px-10 py-4 rounded-2xl hover:opacity-90 transition-all duration-300 shadow-xl shadow-brand-fire/30 hover:scale-105"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="currentColor"
              role="img"
              aria-label="YouTube"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            View All Videos on YouTube
          </a>
        </div>
      </div>
    </section>
  );
}
