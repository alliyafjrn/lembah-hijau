import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async register(dto: RegisterDto) {
        const hashedPassword = await bcrypt.hash(
            dto.password,
            10,
        );
        return this.prisma.user.create({
            data: {
                email: dto.email,
                password: hashedPassword,
            },
        });
    }
    async login(dto: LoginDto) {
        console.log('DTO:', dto);

        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        console.log('USER:', user);

        if (!user) {
            return {
                success: false,
                message: 'User tidak ditemukan',
            };
        }

        const isMatch = await bcrypt.compare(
            dto.password,
            user.password,
        );

        console.log('MATCH:', isMatch);

        if (!isMatch) {
            return {
                success: false,
                message: 'Password salah',
            };
        }

        const token = this.jwtService.sign({
            sub: user.id,
            username: user.email,
        });

        return {
            success: true,
            access_token: token,
        };
    }
}