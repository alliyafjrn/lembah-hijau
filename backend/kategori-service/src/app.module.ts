import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KategoriModule } from './kategori/kategori.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [KategoriModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
