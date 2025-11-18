const colors = {
  pronto: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'em progresso': 'bg-amber-100 text-amber-700 border-amber-200',
  planejado: 'bg-slate-100 text-slate-700 border-slate-200'
};

export default function StatusPill({ status }) {
  const normalized = status?.toLowerCase();
  const colorClass = colors[normalized] || colors.planejado;

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${colorClass}`}>
      {status}
    </span>
  );
}
