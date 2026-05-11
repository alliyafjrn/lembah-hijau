import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  // Menampilkan semua tiket
  async getTickets() {
    return this.prisma.tiket.findMany();
  }

  // Menambah tiket baru
  async createTicket(data: { nama: string; harga: number; stok: number; deskripsi?: string }) {
    return this.prisma.tiket.create({
      data: data,
    });
  }

  // Mengubah data tiket berdasarkan ID
  async updateTicket(id: number, data: { nama?: string; harga?: number; stok?: number; deskripsi?: string }) {
    return this.prisma.tiket.update({
      where: { id: id },
      data: data,
    });
  }

  // Menghapus tiket berdasarkan ID
  async deleteTicket(id: number) {
    return this.prisma.tiket.delete({
      where: { id: id },
    });
  }
}