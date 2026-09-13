import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'juaniquilador',
    description: 'Nombre de usuario en la app',
  })
  username: string;

  @ApiProperty({
    example: 'Juan',
    description: 'Primer nombre del usuario',
  })
  firstName: string;

  @ApiProperty({
    example: 'Pérez',
    description: 'Apellido del usuario',
  })
  lastName: string;

  @ApiProperty({
    example: 'MiPassword123',
    description: 'Contraseña del usuario',
  })
  password: string;
}
