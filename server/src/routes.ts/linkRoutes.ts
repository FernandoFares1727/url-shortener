import { ICreateLink } from '@/app/interfaces/Interfaces';
import { LinkController } from '@/controllers/linkController';
import { FastifyInstance } from 'fastify';

const linkController = new LinkController();

export async function linkRoutes(fastify: FastifyInstance) {
  // Rota POST com tipo para o body
  fastify.post<{ Body: ICreateLink }>(
    '/link/create',
    (request, reply) => linkController.createLink(request, reply)
  );

  // Rota GET sem body
  fastify.get(
    '/links',
    (request, reply) => linkController.getAllLinks(request, reply)
  );

  // Rota DELETE com parâmetro na URL
  fastify.delete<{ Params: { id: string } }>(
    '/link/:id',
    (request, reply) => linkController.deleteLink(request, reply)
  );

  // Rota de redirecionamento com parâmetro na URL
  fastify.get<{ Params: { id: string } }>(
    '/redirect/link/:id',
    (request, reply) => linkController.redirectToOriginalUrl(request, reply)
  );

  // Rota de exportação sem body
  fastify.post(
    '/links/export',
    (request, reply) => linkController.exportToCSV(request, reply)
  );

  // Rota para obter CSV com parâmetro na URL
  fastify.get(
    '/links/import',
    (request, reply) => linkController.getCSV(request, reply)
  );
}