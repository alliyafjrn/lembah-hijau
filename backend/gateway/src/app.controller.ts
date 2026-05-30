import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly httpService: HttpService) {}

  @Get('kategori')
  async getKategori() {
    const response = await firstValueFrom(
      this.httpService.get('http://localhost:3001/kategori'),
    );

    return response.data;
  }

  @Get('kategori/:id')
  async getKategoriById(@Param('id') id: string) {
    const response = await firstValueFrom(
      this.httpService.get(`http://localhost:3001/kategori/${id}`),
    );

    return response.data;
  }

  @Post('kategori')
  async createKategori(@Body() body: any) {
    const response = await firstValueFrom(
      this.httpService.post(
        'http://localhost:3001/kategori',
        body,
      ),
    );

    return response.data;
  }

  @Put('kategori/:id')
  async updateKategori(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    const response = await firstValueFrom(
      this.httpService.put(
        `http://localhost:3001/kategori/${id}`,
        body,
      ),
    );

    return response.data;
  }

  @Delete('kategori/:id')
  async deleteKategori(@Param('id') id: string) {
    const response = await firstValueFrom(
      this.httpService.delete(
        `http://localhost:3001/kategori/${id}`,
      ),
    );

    return response.data;
  }

  @Get('wisata')
  async getWisata() {
    const response = await firstValueFrom(
      this.httpService.get('http://localhost:3002/wisata'),
    );

    return response.data;
  }

  @Get('wisata/:id')
  async getWisataById(@Param('id') id: string) {
    const response = await firstValueFrom(
      this.httpService.get(`http://localhost:3002/wisata/${id}`),
    );

    return response.data;
  }

  @Post('wisata')
  async createWisata(@Body() body: any) {
    const response = await firstValueFrom(
      this.httpService.post(
        'http://localhost:3002/wisata',
        body,
      ),
    );

    return response.data;
  }

  @Put('wisata/:id')
  async updateWisata(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    const response = await firstValueFrom(
      this.httpService.put(
        `http://localhost:3002/wisata/${id}`,
        body,
      ),
    );

    return response.data;
  }

  @Delete('wisata/:id')
  async deleteWisata(@Param('id') id: string) {
    const response = await firstValueFrom(
      this.httpService.delete(
        `http://localhost:3002/wisata/${id}`,
      ),
    );

    return response.data;
  }
}