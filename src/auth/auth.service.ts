import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto.js';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly apiKey = process.env.NESSIE_API_KEY;

  constructor(
    private readonly jwtService: JwtService,

    private readonly userService: UserService,
  ) {}

  async login(request: LoginDto): Promise<string> {
    const { username, password } = request;

    console.log(process.env.JWT_SECRET);

    const user = await this.userService.getByName(username);

    if (!user) {
      throw new NotFoundException('El usuario no existe');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Credenciales incorrectas.');
    }

    const token = await this.generateToken(user);

    return token;
  }

  async generateToken(user: any) {
    const payload = {
      sub: user._id,
      name: user.name,
    };

    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });
  }
}
