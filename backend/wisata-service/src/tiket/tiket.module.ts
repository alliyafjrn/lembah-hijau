import { Module } from '@nestjs/common';
import { TiketService } from './tiket.service';
import { TiketController } from './tiket.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [TiketController],
  providers: [TiketService, PrismaService],
})
export class TiketModule {}
