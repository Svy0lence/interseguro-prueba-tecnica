import { IsStrictlyRectangularMatrix } from "../validators/IsStrictlyRectangularMatrix.validator";
import { IsArrayOfNumbers } from "../validators/IsArrayOfNumbers.validator";

export class MatrixDto {
  @IsArrayOfNumbers({ message: 'La matriz debe ser un array de arrays de números (no vacíos)' })
  @IsStrictlyRectangularMatrix({ message: 'La matriz debe ser estrictamente rectangular (todas las filas del mismo tamaño, pero diferente número de filas y columnas).' })
  matrix!: number[][];
} 