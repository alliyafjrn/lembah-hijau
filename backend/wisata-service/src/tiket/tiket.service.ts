import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Sesuaikan path jika berbeda
import { CreateTiketDto } from './dto/create-tiket.dto';
import { UpdateTiketDto } from './dto/update-tiket.dto';

@Injectable()
export class TiketService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTiketDto: CreateTiketDto) {
  const kode = "TKT-" + Date.now();

  async create(createTiketDto: CreateTiketDto) {
  const kode = "TKT-" + Date.now();

  return this.prisma.tiket.create({
    data: {
      kodeBooking: kode,
      namaPemesan: createTiketDto.namaPemesan,
      email: createTiketDto.email,
      jenisTiket: createTiketDto.jenisTiket,
      harga: Number(createTiketDto.harga),         // Ditambahkan casting Number untuk keamanan
      jumlahTiket: Number(createTiketDto.jumlahTiket), // Ditambahkan casting Number untuk keamanan
      totalHarga: Number(createTiketDto.totalHarga),   // Ditambahkan casting Number untuk keamanan
      wisataId: Number(createTiketDto.wisataId),       // Ditambahkan casting Number untuk keamanan
    },
    include: {
      wisata: true,
    },
  });
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
      data: {
        namaPemesan: updateTiketDto.namaPemesan,
        email: updateTiketDto.email,
        jenisTiket: updateTiketDto.jenisTiket,
        harga: updateTiketDto.harga ? Number(updateTiketDto.harga) : undefined,
        jumlahTiket: updateTiketDto.jumlahTiket ? Number(updateTiketDto.jumlahTiket) : undefined,
        totalHarga: updateTiketDto.totalHarga ? Number(updateTiketDto.totalHarga) : undefined,
        wisataId: updateTiketDto.wisataId ? Number(updateTiketDto.wisataId) : undefined,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.tiket.delete({
      where: { id },
    });
  }
}