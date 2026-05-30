import { Module } from '@nestjs/common';
import { WisataController } from './wisata.controller';
import { WisataService } from './wisata.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [WisataController],
  providers: [WisataService],
})
export class WisataModule {}