import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import axios from 'axios';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWisataDto } from './dto/create-wisata.dto';

@Injectable()
export class WisataService {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
  ) { }

  async findAll() {
    const wisataList = await this.prisma.wisata.findMany();

    const hasil = await Promise.all(
      wisataList.map(async (wisata) => {
        try {
          const kategoriResponse = await axios.get(
            `http://localhost:3003/kategori/${wisata.kategoriId}`,
          );

          return {
            ...wisata,
            kategori: kategoriResponse.data,
          };
        } catch {
          return {
            ...wisata,
            kategori: null,
          };
        }
      }),
    );

    return hasil;
  }

  async findOne(id: number) {
    const wisata = await this.prisma.wisata.findUnique({
      where: { id },
    });

    if (!wisata) {
      throw new NotFoundException(
        'Data wisata tidak ditemukan',
      );
    }

    if (wisata.kategoriId) {
      try {
        const response = await firstValueFrom(
          this.httpService.get(
            `http://localhost:3003/kategori/${wisata.kategoriId}`,
          ),
        );

        return {
          ...wisata,
          kategori: response.data,
        };
      } catch {
        return {
          ...wisata,
          kategori: null,
        };
      }
    }

    return {
      ...wisata,
      kategori: null,
    };
  }

  create(createWisataDto: CreateWisataDto) {
    return this.prisma.wisata.create({
      data: {
        nama: createWisataDto.nama,
        deskripsi: createWisataDto.deskripsi,
        lokasi: "Default Lokasi", // Field wajib di database
        kategoriId: Number(createWisataDto.kategoriId),
        gambar: createWisataDto.gambar || null,
      },
    });
  }

  async update(
    id: number,
    createWisataDto: CreateWisataDto,
  ) {
    await this.findOne(id);

    return this.prisma.wisata.update({
      where: { id },
      data: {
        nama: createWisataDto.nama,
        deskripsi: createWisataDto.deskripsi,
        lokasi: "Default Lokasi",
        kategoriId: Number(createWisataDto.kategoriId),
        gambar: createWisataDto.gambar || null,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.wisata.delete({
      where: { id },
    });
  }
}