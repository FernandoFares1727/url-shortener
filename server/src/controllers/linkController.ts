import { FastifyRequest, FastifyReply } from 'fastify';
import { LinkService } from '@/services/linkService';
import { LinkRepository } from '@/repositories/linkRepository';
import { ICreateLink} from '@/app/interfaces/Interfaces';

const linkRepository = new LinkRepository();
const linkService = new LinkService(linkRepository);

export class LinkController {
  async createLink(
    request: FastifyRequest<{ Body: ICreateLink }>,
    reply: FastifyReply
  ) {
    const { originalUrl, shortUrl } = request.body;
    const result = await linkService.createLink({ originalUrl, shortUrl });
    return reply.code(201).send(result);
  }

  async redirectToOriginalUrl(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    const result = await linkService.redirectToOriginalUrl(request.params.id);
    return reply.code(200).send(result);
  }

  async getAllLinks(request: FastifyRequest, reply: FastifyReply) {
    const result = await linkService.getAllLinks();
    return reply.code(200).send(result);
  }

  async deleteLink(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    await linkService.deleteLink(request.params.id);
    return reply.code(204).send();
  }

  async exportToCSV(request: FastifyRequest, reply: FastifyReply) {
    const result = await linkService.exportLinksToCSV();
    return reply.code(200).send(result);
  }

  async getCSV(request: FastifyRequest, reply: FastifyReply) {
    const { data, fileName } = await linkService.getCSVFile();
    
    reply
      .header('Content-Type', 'text/csv')
      .header('Content-Disposition', `attachment; filename="${fileName}"`)
      .header('X-Content-Type-Options', 'nosniff') 
      .header('Access-Control-Allow-Origin', '*');
  
    return reply.code(200).send(data);
  }
}