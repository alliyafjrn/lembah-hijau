import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateKategoriDto } from './dto/create-kategori.dto';
import { UpdateKategoriDto } from './dto/update-kategori.dto';

@Injectable()
export class KategoriService {
    constructor(private prisma: PrismaService) { }

    async create(createKategoriDto: CreateKategoriDto) {
        return this.prisma.kategori.create({
            data: createKategoriDto,
        });
    }

    async findAll() {
        return this.prisma.kategori.findMany({
            orderBy: {
                id: 'desc',
            },
        });
    }

    async findOne(id: number) {
        return this.prisma.kategori.findUnique({
            where: {
                id,
            },
        });
    }

    async update(id: number, updateKategoriDto: UpdateKategoriDto) {
        return this.prisma.kategori.update({
            where: {
                id,
            },
            data: updateKategoriDto,
        });
    }
}