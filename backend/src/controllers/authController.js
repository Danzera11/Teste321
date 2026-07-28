import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const prisma = new PrismaClient();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export async function login(req, res, next) {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const analyst = await prisma.analyst.findUnique({ where: { email } });

    if (!analyst) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const valid = await bcrypt.compare(password, analyst.password);
    if (!valid) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is required');
    }
    const token = jwt.sign({ sub: analyst.id, role: analyst.role }, process.env.JWT_SECRET, {
      expiresIn: '2h'
    });

    res.json({ token, user: { id: analyst.id, name: analyst.name, email: analyst.email, role: analyst.role } });
  } catch (error) {
    next(error);
  }
}
