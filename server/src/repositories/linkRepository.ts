import { PrismaClient } from '@prisma/client';
import { ILink, ICreateLink } from '../app/interfaces/Interfaces';

const prisma = new PrismaClient();

export class LinkRepository {
  async create(data: ICreateLink): Promise<ILink> {
    return prisma.link.create({
      data,
    });
  }

  async findById(id: string): Promise<ILink | null> {
    return prisma.link.findUnique({
      where: { id },
    });
  }

  async findByShortUrl(shortUrl: string): Promise<ILink | null> {
    return prisma.link.findUnique({
      where: { shortUrl },
    });
  }

  async findByOriginalUrl(originalUrl: string): Promise<ILink | null> {
    return prisma.link.findUnique({
      where: { originalUrl },
    });
  }

  async findAll(): Promise<ILink[]> {
    return prisma.link.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.link.delete({
      where: { id },
    });
  }

  async incrementAccessCount(id: string): Promise<ILink> {
    return prisma.link.update({
      where: { id },
      data: {
        accessCount: {
          increment: 1,
        },
      },
    });
  }
}