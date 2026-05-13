import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsPositive, MinLength, IsOptional } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty()
  tiketId!: number;

  @ApiProperty()
  jumlah!: number;

  @ApiProperty()
  namaPembeli!: string;
}

export class UpdateTransactionDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @IsPositive()
  jumlah?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MinLength(3)
  namaPembeli?: string;
}