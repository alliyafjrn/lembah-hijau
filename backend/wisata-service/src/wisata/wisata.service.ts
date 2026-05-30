import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWisataDto } from './dto/create-wisata.dto';

@Injectable()
export class WisataService {
  constructor(private prisma: PrismaService) {}

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
    console.log(createWisataDto);

    return this.prisma.wisata.create({
      data: createWisataDto,
    });
  }
}