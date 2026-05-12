import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async createTransaction(data: { tiketId: number; jumlah: number; namaPembeli: string }) {
    const tiketId = Number(data.tiketId);
    const tiket = await this.prisma.tiket.findUnique({ where: { id: tiketId } });

    if (!tiket) throw new NotFoundException('Tiket tidak ditemukan');
    if (tiket.stok < data.jumlah) throw new BadRequestException('Stok tiket tidak mencukupi');

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

  async updateTransaction(id: number, data: { jumlah?: number; namaPembeli?: string }) {
    const transaksiLama = await this.prisma.transaksi.findUnique({
      where: { id },
      include: { tiket: true }
    });

    if (!transaksiLama) throw new NotFoundException('Data transaksi tidak ditemukan');

    return this.prisma.$transaction(async (tx) => {
      if (data.jumlah !== undefined && data.jumlah !== transaksiLama.jumlah) {
        const selisih = data.jumlah - transaksiLama.jumlah;

        if (transaksiLama.tiket.stok < selisih) {
          throw new BadRequestException('Stok tiket tidak mencukupi');
        }

        await tx.tiket.update({
          where: { id: transaksiLama.tiketId },
          data: { stok: transaksiLama.tiket.stok - selisih },
        });

        const totalHargaBaru = transaksiLama.tiket.harga * data.jumlah;
        
        return tx.transaksi.update({
          where: { id },
          data: { 
            jumlah: data.jumlah,
            totalHarga: totalHargaBaru,
            namaPembeli: data.namaPembeli 
          },
        });
      }

      return tx.transaksi.update({
        where: { id },
        data: { namaPembeli: data.namaPembeli },
      });
    });
  }

  async deleteTransaction(id: number) {
    const transaksi = await this.prisma.transaksi.findUnique({
      where: { id },
    });

    if (!transaksi) throw new NotFoundException('Transaksi tidak ditemukan');

    return this.prisma.$transaction(async (tx) => {
      await tx.tiket.update({
        where: { id: transaksi.tiketId },
        data: { stok: { increment: transaksi.jumlah } },
      });

      return tx.transaksi.delete({
        where: { id },
      });
    });
  }
}