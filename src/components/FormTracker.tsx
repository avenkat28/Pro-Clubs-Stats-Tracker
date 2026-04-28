type FormTrackerProps = {
  form: string[];
};

export default function FormTracker({ form }: FormTrackerProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white">
      <h2 className="mb-4 text-2xl font-bold">Recent Form</h2>

      <div className="flex gap-3">
        {form.map((result, index) => {
          const color =
            result === "W"
              ? "bg-green-600"
              : result === "D"
              ? "bg-yellow-500"
              : "bg-red-600";

          return (
            <div
              key={`${result}-${index}`}
              className={`${color} flex h-12 w-12 items-center justify-center rounded-xl font-bold`}
            >
              {result}
            </div>
          );
        })}
      </div>
    </section>
  );
}