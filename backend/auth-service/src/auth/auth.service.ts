import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto} from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async register(dto: RegisterDto) {
        return this.prisma.user.create({
            data: {
                email: dto.email,
                password: dto.password,
            },
        });
    }
    async login(dto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        if (!user) {
            return {
                success: false,
                message: 'User tidak ditemukan',
            };
        }

        if (user.password !== dto.password) {
            return {
                success: false,
                message: 'Password salah',
            };
        }

        return {
            success: true,
            message: 'Login berhasil',
            user,
        };
    }
}