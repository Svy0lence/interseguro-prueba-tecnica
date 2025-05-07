import { IsArrayOfNumbers } from '../validators/IsArrayOfNumbers.validator';

export class StatsDto {
  @IsArrayOfNumbers({ message: 'La matriz debe ser un array de arrays de números (no vacíos)' })
  Q!: number[][];

  @IsArrayOfNumbers({ message: 'La matriz debe ser un array de arrays de números (no vacíos)' })
  R!: number[][];
} 