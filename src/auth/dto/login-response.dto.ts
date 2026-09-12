import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    example: 'A883nnSJasjdajsda....',
  })
  authToken: string;
}
