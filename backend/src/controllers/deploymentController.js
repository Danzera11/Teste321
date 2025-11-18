import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const deploymentSchema = z.object({
  clientId: z.string().cuid(),
  modelSelected: z.string(),
  licensing: z.string(),
  status: z.string().optional(),
  notes: z.string().optional()
});

export async function listDeployments(_req, res, next) {
  try {
    const deployments = await prisma.deployment.findMany({
      orderBy: { createdAt: 'desc' },
      include: { client: true, decisions: { include: { analyst: true } } }
    });
    res.json(deployments);
  } catch (error) {
    next(error);
  }
}

export async function createDeployment(req, res, next) {
  try {
    const data = deploymentSchema.parse(req.body);
    const deployment = await prisma.deployment.create({ data });
    res.status(201).json(deployment);
  } catch (error) {
    next(error);
  }
}
