import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { BookDTO } from "./book.dto";

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async create(data: BookDTO) {
    const bookExists = await this.prisma.book.findFirst({
      where: {
        barCode: data.barCode,
      },
    });

    if (bookExists) {
      throw new Error("Book already exists");
    }

    const book = await this.prisma.book.create({
      data,
    });

    return book;
  }
}
