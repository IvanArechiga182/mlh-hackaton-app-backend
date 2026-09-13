import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class AnalyzeDto {
  @ApiProperty({
    example: '2026-09-01',
    description: 'Fecha inicial del rango de búsqueda',
    required: true,
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    example: '2026-09-13',
    description: 'Fecha final del rango de búsqueda',
    required: true,
  })
  @IsDateString()
  endDate: string;
}
