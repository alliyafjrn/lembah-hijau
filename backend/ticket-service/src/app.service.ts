import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getTickets() {
    return this.prisma.tiket.findMany();
  }
  async createTicket(data: { nama: string; harga: number; stok: number; deskripsi?: string }) {
    return this.prisma.tiket.create({
      data: data,
    });
  }
}