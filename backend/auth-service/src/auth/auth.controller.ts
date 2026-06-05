import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import {
    Get,
    Req,
    UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }
    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }
    @Get('profile')
    @UseGuards(JwtAuthGuard)
    profile(@Req() req) {
        return req.user;
    }
    @Get('verify')
    @UseGuards(JwtAuthGuard)
    verify(@Req() req) {
        return {
            valid: true,
            user: req.user,
        };
    }
}