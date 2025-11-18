import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const clientSchema = z.object({
  name: z.string().min(3),
  domain: z.string().email(),
  segment: z.string().min(2)
});

export async function listClients(_req, res, next) {
  try {
    const clients = await prisma.client.findMany({ orderBy: { createdAt: 'desc' }, include: { deployments: true } });
    res.json(clients);
  } catch (error) {
    next(error);
  }
}

export async function createClient(req, res, next) {
  try {
    const data = clientSchema.parse(req.body);
    const client = await prisma.client.create({ data });
    res.status(201).json(client);
  } catch (error) {
    next(error);
  }
}
