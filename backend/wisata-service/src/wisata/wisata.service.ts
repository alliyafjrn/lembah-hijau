import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WisataService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.wisata.findMany();
  }
}