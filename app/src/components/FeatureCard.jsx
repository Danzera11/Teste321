const alignClass = {
  start: 'text-left',
  center: 'text-center',
  end: 'text-right'
};

export default function FeatureCard({ title, description, chips = [], align = 'start' }) {
  const textClass = alignClass[align] || alignClass.start;

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-nitroBlue">{title}</h3>
        <div className="flex items-center gap-2">
          {chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-nitroPurple"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
      <p className={`text-sm leading-relaxed text-slate-600 ${textClass}`}>{description}</p>
    </div>
  );
}
