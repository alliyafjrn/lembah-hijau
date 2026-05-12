import { IsInt, IsString, IsPositive, MinLength, IsOptional } from 'class-validator';

export class CreateTransactionDto {
  @IsInt()
  tiketId!: number;

  @IsInt()
  @IsPositive()
  jumlah!: number;

  @IsString()
  @MinLength(3)
  namaPembeli!: string;
}

export class UpdateTransactionDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  jumlah?: number;

  @IsOptional()
  @IsString()
  @MinLength(3)
  namaPembeli?: string;
}