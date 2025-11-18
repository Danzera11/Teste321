export function notFound(_req, res, _next) {
  res.status(404).json({ message: 'Rota não encontrada' });
}

export function errorHandler(err, _req, res, _next) {
  if (err.name === 'ZodError') {
    return res.status(400).json({ message: 'Payload inválido', issues: err.issues });
  }

  console.error(err);
  res.status(500).json({ message: 'Erro interno do servidor' });
}
