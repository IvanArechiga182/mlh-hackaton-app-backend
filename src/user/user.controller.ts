import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service.js';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user-request.dto.js';
import { IBaseResponse } from '../common/dto/IBaseResponse.interface.js';
import { JwtAuthGuard } from '../auth/guards/auth.guard.js';

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
}
