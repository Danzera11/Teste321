import jwt from 'jsonwebtoken';

export function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'Token não informado' });

  const [, token] = header.split(' ');
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'CHANGE_ME_LONG_RANDOM_JWT_SECRET');
    req.user = payload;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}
