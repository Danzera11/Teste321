import { useMemo, useState } from 'react';
import { models, licensing, roadmap } from './data/scenarios';
import SectionHeader from './components/SectionHeader';
import FeatureCard from './components/FeatureCard';
import StatusPill from './components/StatusPill';

const tabs = [
  { id: 'externo', label: 'Visão Externa', description: 'Resumo que pode ser mostrado ao cliente e ao time executivo.' },
  { id: 'analista', label: 'Painel do Analista', description: 'Ações internas, recomendações e trilha de decisão.' },
  { id: 'cliente', label: 'Portal do Cliente', description: 'Checklist guiado para aprovar e acompanhar a implantação.' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('externo');
  const activeLabel = useMemo(() => tabs.find((tab) => tab.id === activeTab)?.description, [activeTab]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 pb-20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-nitroTeal">Portal Nitro M365</p>
              <h1 className="text-3xl font-black text-nitroBlue lg:text-4xl">Implantação Padronizada</h1>
              <p className="max-w-3xl text-base leading-relaxed text-slate-600">
                Stack completa para guiar analistas, apresentar cenários ao cliente e registrar cada decisão tomada
                durante a jornada de implantação do Microsoft 365.
              </p>
            </div>
            <div className="rounded-full border border-nitroPurple/20 bg-nitroPurple/10 px-5 py-2 text-sm font-semibold text-nitroPurple">
              Node 22 · React + Vite · Prisma · PostgreSQL
            </div>
          </div>
          <nav className="flex flex-wrap items-center gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition hover:shadow-sm ${
                  activeTab === tab.id
                    ? 'border-nitroPurple bg-nitroPurple text-white shadow-card'
                    : 'border-slate-200 bg-white text-nitroBlue'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
          {activeLabel && <p className="text-sm text-slate-600">{activeLabel}</p>}
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-10 px-6 py-10">
        {activeTab === 'externo' && <ExternalView />}
        {activeTab === 'analista' && <AnalystView />}
        {activeTab === 'cliente' && <ClientView />}
      </main>
    </div>
  );
}

function ExternalView() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <SectionHeader
          accent="Cenários"
          title="SharePoint/Teams — escolha guiada"
          subtitle="Apresente as duas alternativas com prós e contras automáticos."
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {models.map((model) => (
            <div key={model.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-nitroBlue">{model.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{model.summary}</p>
                </div>
                <span className="rounded-full bg-nitroPurple/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-nitroPurple">
                  Recomendado
                </span>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-slate-700">
                <div>
                  <p className="font-semibold text-nitroBlue">Prós</p>
                  <ul className="mt-1 list-disc space-y-1 pl-4">
                    {model.pros.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-nitroBlue">Contras</p>
                  <ul className="mt-1 list-disc space-y-1 pl-4">
                    {model.cons.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
                <span className="font-semibold text-nitroBlue">Indicado para:</span> {model.recommendedFor}
              </p>
            </div>
          ))}
        </div>
      </div>

      <aside className="space-y-6">
        <SectionHeader accent="Licenciamento" title="Modelos homologados" />
        <div className="space-y-3">
          {licensing.map((item) => (
            <div key={item.name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-semibold text-nitroBlue">{item.name}</h3>
                <span className="rounded-full bg-nitroTeal/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-nitroTeal">
                  Nitro padrão
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-600">{item.highlight}</p>
              <ul className="mt-3 space-y-1 text-sm text-slate-700">
                {item.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-nitroPurple" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-nitroPurple/20 bg-gradient-to-br from-white via-white to-nitroPurple/5 p-5 shadow-card">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-nitroPurple">Próximos passos</p>
          <h3 className="mt-2 text-xl font-bold text-nitroBlue">Roadmap da Plataforma</h3>
          <div className="mt-3 space-y-3">
            {roadmap.map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2">
                <div>
                  <p className="text-sm font-semibold text-nitroBlue">{item.name}</p>
                  <p className="text-xs text-slate-600">{item.description}</p>
                </div>
                <StatusPill status={item.status} />
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

function AnalystView() {
  const playbook = [
    {
      title: 'Avaliação do Tenant',
      description: 'Checklist automatizado de segurança, domínios, MFA e integrações ativas.',
      chips: ['SEGURANÇA', 'AUDITORIA']
    },
    {
      title: 'Fluxo Inteligente if/else',
      description: 'Perguntas rápidas geram recomendações instantâneas sobre modelo A ou B e licenciamento.',
      chips: ['DECISION FLOW']
    },
    {
      title: 'Geração de Sites e Grupos',
      description: 'Templates versionados para Teams, sites SharePoint e grupos Microsoft 365.',
      chips: ['AUTOMAÇÃO']
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
          <SectionHeader
            accent="Playbook"
            title="Ações rápidas do analista"
            subtitle="Tudo o que o time precisa para seguir o padrão Nitro sem improvisos."
          />
          <div className="mt-5 space-y-4">
            {playbook.map((item) => (
              <FeatureCard key={item.title} {...item} />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-nitroPurple/20 bg-gradient-to-br from-nitroBlue to-nitroPurple text-white shadow-card">
          <div className="space-y-4 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-nitroTeal/80">Registro em tempo real</p>
            <h3 className="text-2xl font-bold">Implantações</h3>
            <p className="text-sm text-slate-100">
              Cada decisão é gravada (modelo, licenciamento, riscos, responsáveis). O histórico fica disponível para
              liderança e para auditoria.
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                ['Implantações ativas', '12'],
                ['Clientes em onboarding', '5'],
                ['Riscos identificados', '3'],
                ['Última atualização', 'há 12min']
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl bg-white/10 p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-100">{label}</p>
                  <p className="text-xl font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-white/10 bg-white/10 p-6 text-sm">
            <p className="font-semibold text-white">Checklist automatizado</p>
            <p className="text-slate-100">Verifique MFA, domínios, logs e owners do tenant antes de avançar.</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
        <SectionHeader accent="Fluxo" title="Trilha de decisão" subtitle="If/else visual para padronizar recomendações." />
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {['Porte do cliente', 'Uso de Teams', 'Criticidade de segurança'].map((item) => (
            <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-nitroBlue">{item}</p>
              <p className="text-xs text-slate-600">O fluxo considera respostas e sugere modelo/licença automaticamente.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ClientView() {
  const steps = [
    {
      title: 'Kickoff com liderança',
      description: 'Alinhamento sobre estrutura desejada, nomenclatura e áreas críticas.',
      owner: 'Analista responsável'
    },
    {
      title: 'Validação do modelo',
      description: 'Apresente as duas opções (site único vs sites independentes) e colete aprovação.',
      owner: 'Cliente + Analista'
    },
    {
      title: 'Entrega e treinamento',
      description: 'Checklist de comunicação, governança e boas práticas para cada departamento.',
      owner: 'Time Nitro'
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
        <SectionHeader accent="Cliente" title="Portal de acompanhamento" subtitle="Checklist visual para aprovações." />
        <div className="mt-5 space-y-4">
          {steps.map((step, index) => (
            <div key={step.title} className="flex gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-nitroPurple/10 text-sm font-bold text-nitroPurple">
                {index + 1}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-nitroBlue">{step.title}</p>
                <p className="text-xs text-slate-600">{step.description}</p>
                <p className="text-xs font-semibold text-nitroPurple">Responsável: {step.owner}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-nitroTeal/30 bg-gradient-to-br from-white via-white to-nitroTeal/10 p-6 shadow-card">
        <SectionHeader accent="Compartilhamento" title="Material pronto para cliente" />
        <ul className="mt-4 space-y-3 text-sm text-slate-700">
          <li className="flex items-start gap-2">
            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-nitroPurple" />
            Relatório PDF da decisão (modelo, licenciamento, checklist de riscos)
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-nitroPurple" />
            Página segura com status da implantação e próximos passos
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-nitroPurple" />
            Acesso convidado para validação de sites e equipes no Teams
          </li>
        </ul>
        <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4 text-sm">
          <p className="font-semibold text-nitroBlue">Login JWT</p>
          <p className="text-slate-600">Integração planejada com a API (rota /auth) para clientes e analistas.</p>
        </div>
      </div>
    </div>
  );
}
