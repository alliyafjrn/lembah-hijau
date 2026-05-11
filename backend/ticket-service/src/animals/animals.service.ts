import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class AnimalsService {
  constructor(private prisma: PrismaService) {}

  async getAnimals() {
    return this.prisma.hewan.findMany();
  }

  async createAnimal(data: { nama: string; spesies: string; umur: number; habitat: string; lokasi?: string }) {
    return this.prisma.hewan.create({
      data: data,
    });
  }

  async updateAnimal(id: number, data: { nama?: string; spesies?: string; umur?: number; habitat?: string; lokasi?: string }) {
    return this.prisma.hewan.update({
      where: { id: id },
      data: data,
    });
  }
}