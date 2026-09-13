import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: '938832-8371AASd...',
    description: 'Primer nombre del usuario',
  })
  username: string;

  @ApiProperty({
    example: 'SafePassw0rd123',
    description: 'Contraseña del usuario',
  })
  password: string;
}
