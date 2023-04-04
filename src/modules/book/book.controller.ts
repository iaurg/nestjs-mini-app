import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { BookService } from "./book.service";
import { BookDTO } from "./book.dto";

@Controller("book")
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() book: BookDTO) {
    return this.bookService.create(book);
  }

  @Get()
  async findAll() {
    return this.bookService.findAll();
  }

  @Put(":id")
  async update(@Body() book: BookDTO, @Param("id") id: string) {
    return this.bookService.update(id, book);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.bookService.delete(id);
  }
}
