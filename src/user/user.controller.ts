import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service.js';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user-request.dto.js';
import { IBaseResponse } from '../common/dto/IBaseResponse.interface.js';
import { JwtAuthGuard } from '../auth/guards/auth.guard.js';
import { CurrentUser } from '../decorators/current-user.decorator.js';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Usuario creado exitosamente',
  })
  async create(@Body() request: CreateUserDto): Promise<IBaseResponse> {
    const newUser = await this.userService.create(request);

    return {
      message: 'Recurso creado exitosamente',
      status: 200,
      resource: newUser,
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get()
  @ApiOkResponse({
    description: 'Usuarios obtenidos exitosamente',
  })
  async findAll(): Promise<IBaseResponse> {
    const users = await this.userService.getUsers();

    return {
      message: 'Recursos obtenidos exitosamente',
      status: 200,
      resource: users,
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Patch()
  @ApiOkResponse({
    description: 'Ahorros actualizados exitosamente',
  })
  @ApiQuery({
    name: 'amount',
    required: true,
  })
  async updateSavings(
    @CurrentUser() userData: any,
    @Query('amount') amount: number,
  ): Promise<IBaseResponse> {
    const { accountNumber } = userData;

    await this.userService.updateSavingsBalance(accountNumber, Number(amount));

    return {
      message: 'Ahorros actualizados correctamente',
      status: 200,
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('savings')
  async findSavings(@CurrentUser() userData: any): Promise<IBaseResponse> {
    const { accountNumber } = userData;

    const savings = await this.userService.findSaving(accountNumber);

    return {
      message: 'Ahorro obtenido correctamente',
      status: 200,
      resource: savings,
    };
  }
}
