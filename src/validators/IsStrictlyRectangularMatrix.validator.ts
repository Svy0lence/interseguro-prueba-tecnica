import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsStrictlyRectangularMatrix(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsStrictlyRectangularMatrix',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          if (!Array.isArray(value) || value.length === 0) return false;

          const numRows = value.length;

          if (!Array.isArray(value[0]) || value[0].length === 0) return false;

          const numCols = value[0].length;

          if (numRows === numCols) return false;

          return value.every(
            row => Array.isArray(row) && row.length === numCols,
          );
        },
        defaultMessage(): string {
          return 'La matriz debe ser estrictamente rectangular (todas las filas del mismo tamaño, pero diferente número de filas y columnas).';
        },
      },
    });
  };
}
