import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { conflictTiket } from '../common/utils/conflict-tiket.util';

@Injectable()
export class TicketService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.tiket.findMany();
  }

  async create(data: any) {
    await conflictTiket(
      this.prisma.tiket,
      'Nama tiket sudah ada!',
      data.nama,
    );

    return await this.prisma.tiket.create({
      data: data,
    });
  }

  async update(id: number, data: any) {
    if (data.nama) {
      await conflictTiket(this.prisma.tiket, 'Nama sudah dipakai!', data.nama, id);
    }

    return await this.prisma.tiket.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: number) {
    return await this.prisma.tiket.delete({
      where: { id },
    });
  }
}