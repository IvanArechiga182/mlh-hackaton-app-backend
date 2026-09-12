import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto.js';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  private readonly apiKey = process.env.NESSIE_API_KEY;

  constructor(
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
  ) {}

  // async login(request: LoginDto): Promise<string> {
  //   const responseCustomer = await firstValueFrom(
  //     this.httpService.get(
  //       `${process.env.NESSIE_BASE_URI}/customers/${request.userId}`,
  //       {
  //         params: {
  //           key: this.apiKey,
  //         },
  //       },
  //     ),
  //   );

  //   const { dataCustomer } = responseCustomer;

  //   if (!dataCustomer) {
  //     throw new NotFoundException(
  //       `Usuario con cuenta ${request.userAccountNumber} no existe`,
  //     );
  //   }

  //   const responseAccount = await firstValueFrom(
  //     this.httpService.get(
  //       `${process.env.NESSIE_BASE_URI}/customers/${data._id}/accounts`,
  //       {
  //         params: {
  //           key: this.apiKey,
  //         },
  //       },
  //     ),
  //   );

  //   const { dataAccount } = responseAccount;

  //   return this.generateToken(dataAccount);
  // }

  async generateToken(user: any) {
    const payload = {
      sub: user._id,
      name: user.name,
      userAccount: user.account,
    };

    return this.jwtService.signAsync(payload);
  }
}
