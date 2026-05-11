import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class AnimalsService {
  constructor(private prisma: PrismaService) {}

  // Fungsi untuk mengambil semua data hewan
  async getAnimals() {
    return this.prisma.hewan.findMany();
  }
}