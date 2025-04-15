import { AppError } from '@/app/errors/appError';
import { ILink, ICreateLink } from '../app/interfaces/ILink';
import { validateShortUrl } from '../app/utils/generateShortUrl';
import { LinkRepository } from '@/repositories/linkRepository';
import { GetObjectCommand, HeadObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { format } from 'date-fns';
import { env } from '@/app/config/envSchema';
import s3Client from '../app/utils/s3Client';
import { Readable } from 'node:stream';

export class LinkService {
  constructor(private linkRepository: LinkRepository) {}

  async createLink(data: ICreateLink): Promise<ILink> {
    if (!validateShortUrl(data.shortUrl)) {
      throw new AppError('Invalid short URL format', 400);
    }
  
    const existingShortLink = await this.linkRepository.findByShortUrl(data.shortUrl);
    const existingOriginalLink = await this.linkRepository.findByOriginalUrl(data.originalUrl);
    
    if (existingShortLink && existingOriginalLink) {
      throw new AppError('Both short URL and original URL already exist', 409);
    }
    
    if (existingShortLink) {
      throw new AppError('Short URL already exists', 409);
    }
    
    if (existingOriginalLink) {
      throw new AppError('Original URL already exists', 409);
    }
  
    return this.linkRepository.create(data);
  }

  async getOriginalUrl(shortUrl: string): Promise<string> {
    const link = await this.linkRepository.findByShortUrl(shortUrl);
    if (!link) {
      throw new AppError('Link not found', 404);
    }

    await this.linkRepository.incrementAccessCount(link.id);
    return link.originalUrl;
  }

  async getAllLinks(): Promise<ILink[]> {
    return this.linkRepository.findAll();
  }

  async deleteLink(id: string): Promise<void> {
    const link = await this.linkRepository.findById(id);
    if (!link) {
      throw new AppError('Link not found', 404);
    }

    await this.linkRepository.delete(link.id);
  }

  async exportLinksToCSV(): Promise<{ message: string; url: string }> {
    try {
      const links = await this.getAllLinks();
      const csvData = links.map((link) => ({
        originalUrl: link.originalUrl,
        shortUrl: link.shortUrl,
        accessCount: link.accessCount,
        createdAt: format(link.createdAt, 'yyyy-MM-dd HH:mm:ss'),
      }));

      let csv = 'Original URL,Short URL,Access Count,Created At\n';
      csvData.forEach((row) => {
        csv += `"${row.originalUrl}","${row.shortUrl}",${row.accessCount},"${row.createdAt}"\n`;
      });

      const fileName = `Links.csv`;
      const command = new PutObjectCommand({
        Bucket: env.R2_BUCKET_NAME,
        Key: fileName,
        Body: csv,
        ContentType: 'text/csv',
      });

      await s3Client.send(command);

      return {
        message: 'CSV exported successfully',
        url: `https://${env.R2_PUBLIC_URL}/${env.R2_BUCKET_NAME}/${fileName}`,
      };
    } catch (error) {
      throw new AppError('Failed to export CSV', 500);
    }
  }

  async getCSVFile(): Promise<{ data: Readable; fileName: string }> {
    const fileName = 'Links.csv';
    
    // Verifica se o arquivo existe
    try {
      await s3Client.send(new HeadObjectCommand({
        Bucket: env.R2_BUCKET_NAME,
        Key: fileName
      }));
    } catch (error) {
      throw new AppError('CSV file not found', 404);
    }
  
    // Obtém o arquivo do R2
    const { Body } = await s3Client.send(new GetObjectCommand({
      Bucket: env.R2_BUCKET_NAME,
      Key: fileName
    }));
  
    if (!Body) {
      throw new AppError('Empty CSV file', 422);
    }

    // Converte Body para Readable explicitamente
    const readableStream = Body as Readable;
    
    if (!(readableStream instanceof Readable)) {
      throw new AppError('Invalid file format', 500);
    }
  
    return {
      data: readableStream,
      fileName
    };
  }
}