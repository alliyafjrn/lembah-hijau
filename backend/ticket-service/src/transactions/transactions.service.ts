import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async createTransaction(data: { tiketId: number; jumlah: number; namaPembeli: string }) {
    // Pastikan ID ada dan bertipe number
    const tiketId = Number(data.tiketId);
    
    const tiket = await this.prisma.tiket.findUnique({
      where: { id: tiketId },
    });

    if (!tiket) throw new NotFoundException('Tiket tidak ditemukan');

    if (tiket.stok < data.jumlah) {
      throw new BadRequestException('Stok tiket tidak mencukupi');
    }

    const totalHarga = tiket.harga * data.jumlah;

    return this.prisma.$transaction(async (tx) => {
      const transaksi = await tx.transaksi.create({
        data: {
          tiketId: tiketId,
          jumlah: data.jumlah,
          totalHarga: totalHarga,
          namaPembeli: data.namaPembeli,
        },
      });

      await tx.tiket.update({
        where: { id: tiketId },
        data: { stok: tiket.stok - data.jumlah },
      });

      return transaksi;
    });
  }

  async getAllTransactions() {
    return this.prisma.transaksi.findMany({
      include: { tiket: true },
    });
  }
}