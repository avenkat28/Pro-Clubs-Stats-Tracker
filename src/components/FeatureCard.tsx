type FeatureCardProps = {
  title: string;
  description: string;
};

export default function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white">
      <h3 className="mb-3 text-xl font-bold">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}