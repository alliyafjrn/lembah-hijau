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
import {
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Gateway')
@Controller()
export class AppController {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  // KATEGORI

  @ApiOperation({ summary: 'Ambil semua kategori' })
  @Get('kategori')
  async getKategori() {
    const response = await firstValueFrom(
      this.httpService.get('http://localhost:3001/kategori'),
    );

    return response.data;
  }

  @ApiOperation({ summary: 'Ambil kategori berdasarkan ID' })
  @ApiParam({ name: 'id', example: 1 })
  @Get('kategori/:id')
  async getKategoriById(@Param('id') id: string) {
    const response = await firstValueFrom(
      this.httpService.get(`http://localhost:3001/kategori/${id}`),
    );

    return response.data;
  }

  @ApiOperation({ summary: 'Tambah kategori' })
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

  @ApiOperation({ summary: 'Update kategori' })
  @ApiParam({ name: 'id', example: 1 })
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

  @ApiOperation({ summary: 'Hapus kategori' })
  @ApiParam({ name: 'id', example: 1 })
  @Delete('kategori/:id')
  async deleteKategori(@Param('id') id: string) {
    const response = await firstValueFrom(
      this.httpService.delete(
        `http://localhost:3001/kategori/${id}`,
      ),
    );

    return response.data;
  }

  // WISATA

  @ApiOperation({ summary: 'Ambil semua wisata' })
  @Get('wisata')
  async getWisata() {
    const response = await firstValueFrom(
      this.httpService.get('http://localhost:3002/wisata'),
    );

    return response.data;
  }

  @ApiOperation({
    summary: 'Ambil detail wisata beserta kategori',
  })
  @ApiParam({ name: 'id', example: 1 })
  @Get('wisata/:id')
  async getWisataById(@Param('id') id: string) {
    const wisataResponse = await firstValueFrom(
      this.httpService.get(
        `http://localhost:3002/wisata/${id}`,
      ),
    );

    const wisata = wisataResponse.data;

    if (wisata.kategoriId) {
      try {
        const kategoriResponse = await firstValueFrom(
          this.httpService.get(
            `http://localhost:3001/kategori/${wisata.kategoriId}`,
          ),
        );

        wisata.kategori = kategoriResponse.data.data;
      } catch {
        wisata.kategori = null;
      }
    }

    return wisata;
  }

  @ApiOperation({ summary: 'Tambah wisata' })
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

  @ApiOperation({ summary: 'Update wisata' })
  @ApiParam({ name: 'id', example: 1 })
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

  @ApiOperation({ summary: 'Hapus wisata' })
  @ApiParam({ name: 'id', example: 1 })
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