import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTiketDto } from './dto/create-tiket.dto';
import { UpdateTiketDto } from './dto/update-tiket.dto';

@Injectable()
export class TiketService {
  constructor(private prisma: PrismaService) {}

  async create(createTiketDto: CreateTiketDto) {
    console.log('DATA MASUK:', createTiketDto);

    const wisataId = Number(createTiketDto.wisataId);

    if (!wisataId) {
      throw new BadRequestException('wisataId wajib diisi');
    }

    const wisata = await this.prisma.wisata.findFirst({
      where: {
        id: wisataId,
      },
    });

    if (!wisata) {
      throw new NotFoundException(
        `Wisata dengan ID ${wisataId} tidak ditemukan`,
      );
    }

    const kodeBooking = `TKT-${Date.now()}`;

    return this.prisma.tiket.create({
      data: {
        kodeBooking,
        namaPemesan: createTiketDto.namaPemesan,
        email: createTiketDto.email,
        jenisTiket: createTiketDto.jenisTiket,
        harga: Number(createTiketDto.harga),
        jumlahTiket: Number(createTiketDto.jumlahTiket),
        totalHarga: Number(createTiketDto.totalHarga),
        wisataId,
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
      where: {
        id,
      },
      include: {
        wisata: true,
      },
    });
  }

  async update(id: number, updateTiketDto: UpdateTiketDto) {
    return this.prisma.tiket.update({
      where: {
        id,
      },
      data: updateTiketDto,
    });
  }

  async remove(id: number) {
    return this.prisma.tiket.delete({
      where: {
        id,
      },
    });
  }
}