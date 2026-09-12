import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: '938832-8371AASd...',
    description: 'Primer nombre del usuario',
  })
  userId: string;

  @ApiProperty({
    example: '9939982',
    description: 'Numero de cuenta del usuario',
  })
  userAccountNumber: string;
}
