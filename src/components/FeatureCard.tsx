type FeatureCardProps = {
  title: string;
  description: string;
};

export default function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="home-feature-card rounded-lg border border-emerald-300/12 bg-[#080b0a]/92 p-5 text-white shadow-[0_18px_45px_rgba(0,0,0,0.18)] ring-1 ring-white/[0.03]">
      <h3 className="mb-3 text-base font-black">{title}</h3>
      <p className="text-sm leading-6 text-white/55">{description}</p>
    </div>
  );
}
