import mongoose, { Document, Schema } from "mongoose";
import { IBook } from "../types/book.interface";

export interface BookDocument extends IBook, Document {}

const bookSchema = new Schema<BookDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishedYear: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Book = mongoose.model<BookDocument>("Book", bookSchema);
