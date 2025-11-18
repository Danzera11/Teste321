export default function SectionHeader({ title, subtitle, accent }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-1 rounded-full bg-gradient-to-b from-nitroTeal to-nitroPurple" />
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-nitroTeal">{accent}</p>
        <h2 className="text-2xl font-bold text-nitroBlue">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-slate-600">{subtitle}</p>}
      </div>
    </div>
  );
}
