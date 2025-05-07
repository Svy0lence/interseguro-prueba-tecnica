import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
  } from 'class-validator';
  
  export function IsArrayOfNumbers(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'IsArrayOfNumbers',
        target: object.constructor,
        propertyName,
        options: validationOptions,
        validator: {
          validate(value: any, _args: ValidationArguments) {
            if (!Array.isArray(value)) return false;
  
            return value.every(row => Array.isArray(row) && row.every(cell => typeof cell === 'number'));
          },
          defaultMessage(): string {
            return 'Cada fila debe ser un array de números.';
          },
        },
      });
    };
  }
  