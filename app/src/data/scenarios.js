export const models = [
  {
    id: 'modelo-a',
    name: 'Modelo A — Site Único SharePoint com Subpastas',
    summary: 'Um único site administrativo com pastas por área, ideal para times enxutos e controle centralizado.',
    pros: [
      'Estrutura simples e fácil de gerenciar',
      'Controle de permissão centralizado com grupos',
      'Menor esforço inicial de configuração'
    ],
    cons: [
      'Risco maior de exposição acidental de arquivos',
      'Escalabilidade limitada à medida que a empresa cresce',
      'Colaboração menos eficiente entre áreas'
    ],
    recommendedFor: 'Empresas menores ou em estágio inicial, com necessidade de governança simples.'
  },
  {
    id: 'modelo-b',
    name: 'Modelo B — Equipes no Teams com Sites Independentes',
    summary: 'Cada departamento recebe uma equipe no Teams e um site SharePoint dedicado, com e-mails de grupo padronizados.',
    pros: [
      'Isolamento total entre áreas e menor risco de vazamento interno',
      'Permissões e auditoria simplificadas por departamento',
      'Melhor experiência de colaboração no Teams + SharePoint'
    ],
    cons: [
      'Maior quantidade de sites para administrar',
      'Exige um padrão mais robusto e entendimento do cliente',
      'Necessário alinhar bem a nomenclatura e a criação de grupos'
    ],
    recommendedFor: 'Empresas em crescimento, com times distribuídos e alta necessidade de colaboração segura.'
  }
];

export const licensing = [
  {
    name: 'Microsoft 365 Basic',
    highlight: 'Ideal para usuários que não precisam do Office instalado.',
    details: [
      'Sem Office local',
      'Sem Teams Premium',
      'Acesso web completo e com segurança gerenciada'
    ]
  },
  {
    name: 'Microsoft 365 Standard',
    highlight: 'Licenciamento recomendado como padrão de implantação.',
    details: [
      'Office completo instalado com melhores integrações',
      'Experiência colaborativa completa e estável',
      'Melhor custo-benefício para a maioria dos clientes'
    ]
  },
  {
    name: 'Apps for Business',
    highlight: 'Opção econômica com installer local para cenários controlados.',
    details: [
      'Instalação do Office local com até 10 dispositivos',
      'Necessita vincular manualmente ao tenant',
      'Avaliar riscos de ativação e gestão de máquinas'
    ]
  }
];

export const roadmap = [
  {
    name: 'Login JWT',
    status: 'em progresso',
    description: 'Autenticação unificada para analistas e clientes com expiração segura.'
  },
  {
    name: 'Painel de Implantação',
    status: 'pronto',
    description: 'Visualização de implantações, status, riscos e responsáveis.'
  },
  {
    name: 'Fluxo inteligente (if/else)',
    status: 'planejado',
    description: 'Recomendações automáticas baseadas no perfil e porte do cliente.'
  },
  {
    name: 'Exportação de relatórios',
    status: 'planejado',
    description: 'Geração de PDFs para liderança e clientes com trilha de decisão.'
  }
];
