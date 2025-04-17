import fastify from 'fastify';
import cors from '@fastify/cors';
import { linkRoutes } from './routes.ts/linkRoutes';
import { AppError } from './app/errors/appError';
const app = fastify({ logger: true });

// Register plugins
app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
});

// Register routes
app.register(linkRoutes, { prefix: '/api/v1' });

// Error handling
app.setErrorHandler((error, request, reply) => {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({ error: error.message });
  }

  app.log.error(error);
  return reply.status(500).send({ error: 'Internal Server Error' });
});

export { app };