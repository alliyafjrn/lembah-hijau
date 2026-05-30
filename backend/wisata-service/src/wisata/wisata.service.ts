import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWisataDto } from './dto/create-wisata.dto';

@Injectable()
export class WisataService {
  constructor(private prisma: PrismaService) { }

  findAll() {
    return this.prisma.wisata.findMany();
  }

  async findOne(id: number) {
    const wisata = await this.prisma.wisata.findUnique({
      where: { id },
    });

    if (!wisata) {
      throw new NotFoundException('Data wisata tidak ditemukan');
    }

    return wisata;
  }

  create(createWisataDto: CreateWisataDto) {
    console.log('DATA MASUK:', createWisataDto);

    return this.prisma.wisata.create({
      data: createWisataDto,
    });
  }

  async update(id: number, createWisataDto: CreateWisataDto) {
    await this.findOne(id);

    return this.prisma.wisata.update({
      where: { id },
      data: createWisataDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.wisata.delete({
      where: { id },
    });
  }
}