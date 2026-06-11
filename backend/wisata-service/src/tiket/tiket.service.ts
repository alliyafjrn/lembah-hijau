import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTiketDto } from './dto/create-tiket.dto';
import { UpdateTiketDto } from './dto/update-tiket.dto';

@Injectable()
export class TiketService {
  constructor(private prisma: PrismaService) { }

  async create(createTiketDto: CreateTiketDto) {
    try {
      return await this.prisma.tiket.create({
        data: {
          namaPemesan: createTiketDto.namaPemesan,
          email: createTiketDto.email,
          jumlahTiket: Number(createTiketDto.jumlahTiket),
          wisataId: Number(createTiketDto.wisataId) 
        },
      });
    } catch (error: any) {
      throw new Error(`Prisma Gagal Total: ${error.message}`);
    }
  }

  async findAll() {
    return this.prisma.tiket.findMany({
      include: {
        wisata: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.tiket.findUnique({
      where: { id },
      include: {
        wisata: true,
      },
    });
  }

  async update(id: number, updateTiketDto: UpdateTiketDto) {
    return this.prisma.tiket.update({
      where: { id },
      data: updateTiketDto,
    });
  }

  async remove(id: number) {
    return this.prisma.tiket.delete({
      where: { id },
    });
  }
}