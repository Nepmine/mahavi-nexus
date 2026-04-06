import { useCountUp } from "@/hooks/useCountUp";

interface StatProps {
  end: number;
  suffix: string;
  label: string;
}

const StatCard = ({ end, suffix, label }: StatProps) => {
  const { count, ref } = useCountUp(end, 2200);

  return (
    <div ref={ref} className="text-center">
      <div className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-2">
        <span className="gradient-text-tech">{count}</span>
        <span className="gradient-text-creative">{suffix}</span>
      </div>
      <p className="text-muted-foreground font-medium">{label}</p>
    </div>
  );
};

const stats = [
  { end: 50, suffix: "+", label: "Projects Completed" },
  { end: 30, suffix: "+", label: "Happy Clients" },
  { end: 15, suffix: "+", label: "Technologies Used" },
  { end: 3, suffix: "+", label: "Years of Experience" },
];

const StatsSection = () => (
  <section className="py-20 relative overflow-hidden">
    <div className="absolute inset-0 gradient-tech opacity-[0.03]" />
    <div className="container mx-auto px-6 relative z-10">
      <div className="glass-strong rounded-3xl p-10 md:p-16 border border-primary/10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 stagger-children">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default StatsSection;
