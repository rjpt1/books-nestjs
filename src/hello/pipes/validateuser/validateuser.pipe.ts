import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidateuserPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {

    const edadNumero = parseInt(value.age, 10);

    if (isNaN(edadNumero) || edadNumero <= 0) {
      throw new HttpException('Age must be a positive number', HttpStatus.BAD_REQUEST);
    }
    return {...value, age: edadNumero};
  }
}
