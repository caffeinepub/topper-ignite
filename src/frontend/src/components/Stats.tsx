import { BookOpen, PlayCircle, Star, Users } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "10,000+",
    label: "Students Learning",
    color: "text-brand-fire",
  },
  {
    icon: PlayCircle,
    value: "100+",
    label: "Video Lectures",
    color: "text-brand-gold",
  },
  {
    icon: BookOpen,
    value: "13",
    label: "Chapters Covered",
    color: "text-brand-teal",
  },
  {
    icon: Star,
    value: "4.9★",
    label: "Student Rating",
    color: "text-brand-fire",
  },
];

export default function Stats() {
  return (
    <section className="py-16 bg-gradient-to-b from-site-bg to-site-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-site-card border border-white/10 rounded-2xl p-6 text-center hover:border-brand-fire/30 transition-all duration-300 hover:shadow-lg hover:shadow-brand-fire/10 group"
              >
                <div className={`flex justify-center mb-3 ${stat.color}`}>
                  <Icon className="w-8 h-8 group-hover:scale-110 transition-transform" />
                </div>
                <div
                  className={`font-heading font-black text-3xl md:text-4xl ${stat.color} mb-1`}
                >
                  {stat.value}
                </div>
                <div className="text-white/60 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
