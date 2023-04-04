import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { BookDTO } from "./book.dto";

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async create(book: BookDTO) {
    const bookExists = await this.prisma.book.findUnique({
      where: {
        barCode: book.barCode,
      },
    });

    if (bookExists) {
      throw new Error("Book already exists");
    }

    this.prisma.book.create({
      data: book,
    });

    return book;
  }
}
