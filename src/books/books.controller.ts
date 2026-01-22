import { Controller, Get, Post, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Book> {
    return this.booksService.findOne(+id);
  }

  @Post()
  async create(@Body() dto: CreateBookDto): Promise<void> {
    //return this.booksService.create(dto);
    await this.booksService.create(dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    //return this.booksService.remove(+id);
    await this.booksService.remove(+id);
  }


}
