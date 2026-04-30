type FeatureCardProps = {
  title: string;
  description: string;
};

export default function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="rounded-2xl border border-white/12 bg-black/42 p-6 text-white shadow-[0_18px_55px_rgba(0,0,0,0.28)] backdrop-blur-md">
      <h3 className="mb-3 text-xl font-bold">{title}</h3>
      <p className="text-white/58">{description}</p>
    </div>
  );
}
