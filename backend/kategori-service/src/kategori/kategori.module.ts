import { Module } from '@nestjs/common';
import { KategoriController } from './kategori.controller';
import { KategoriService } from './kategori.service';
import { PrismaModule } from '../prisma/prisma.module'; // Pastikan path import ini benar

@Module({
  imports: [PrismaModule], 
  controllers: [KategoriController],
  providers: [KategoriService],
})
export class KategoriModule {}