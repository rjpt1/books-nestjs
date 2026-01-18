import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ValidateuserPipe } from './pipes/validateuser/validateuser.pipe';
import { AuthGuard } from './guards/auth/auth.guard';

@Controller('hello')
export class HelloController {

//metodo de prueba para probar pipes personalizados 
  @Get('greet')
  @UseGuards(AuthGuard)
  greet(@Query(ValidateuserPipe) query: {name: string, age: number}) {
    return `Hello ${query.name}, you are ${query.age+30} years old!`;
  }

}
