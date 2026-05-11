type FeatureCardProps = {
  title: string;
  description: string;
};

export default function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="rounded-lg border border-white/10 bg-[#080b0a] p-5 text-white">
      <h3 className="mb-3 text-lg font-semibold">{title}</h3>
      <p className="text-sm leading-6 text-white/55">{description}</p>
    </div>
  );
}
