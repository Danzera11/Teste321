import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { z } from 'zod';

const prisma = new PrismaClient();

const analystSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.string().default('analyst')
});

export async function listAnalysts(_req, res, next) {
  try {
    const analysts = await prisma.analyst.findMany({ orderBy: { createdAt: 'desc' }, select: { id: true, name: true, email: true, role: true, createdAt: true } });
    res.json(analysts);
  } catch (error) {
    next(error);
  }
}

export async function createAnalyst(req, res, next) {
  try {
    const payload = analystSchema.parse(req.body);
    const password = await bcrypt.hash(payload.password, 10);
    const analyst = await prisma.analyst.create({ data: { ...payload, password } });
    res.status(201).json({ id: analyst.id, name: analyst.name, email: analyst.email, role: analyst.role });
  } catch (error) {
    next(error);
  }
}
