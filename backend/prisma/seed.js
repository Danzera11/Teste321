import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const analyst = await prisma.analyst.upsert({
    where: { email: 'analista@nitro.com' },
    update: {},
    create: {
      name: 'Analista Nitro',
      email: 'analista@nitro.com',
      role: 'admin',
      password: await bcrypt.hash('nitro123', 10)
    }
  });

  const client = await prisma.client.upsert({
    where: { domain: 'cliente.com.br' },
    update: {},
    create: {
      name: 'Cliente Exemplo',
      domain: 'cliente.com.br',
      segment: 'Serviços'
    }
  });

  await prisma.deployment.create({
    data: {
      clientId: client.id,
      modelSelected: 'Modelo B',
      licensing: 'Microsoft 365 Standard',
      status: 'andamento',
      notes: 'Implantação piloto seguindo padrão Nitro',
      decisions: {
        create: {
          analystId: analyst.id,
          description: 'Cliente com times distribuídos, adotado modelo de sites independentes.'
        }
      }
    }
  });

  console.log('Seed concluída.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
