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

  async findAll() {
    const books = await this.prisma.book.findMany();

    return books;
  }

  async update(id: string, data: BookDTO) {
    const bookExists = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });

    if (!bookExists) {
      throw new Error("Book not found");
    }

    const book = await this.prisma.book.update({
      where: {
        id,
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    return book;
  }

  async delete(id: string) {
    const bookExists = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });

    if (!bookExists) {
      throw new Error("Book not found");
    }

    const book = await this.prisma.book.delete({
      where: {
        id,
      },
    });

    return book;
  }
}
