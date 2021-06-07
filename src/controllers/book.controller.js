import isNumber from 'is-number';
import { InternalServerError, BadRequestError } from "../errors";

export default class BookController {
  constructor(userService, bookService) {
    this._userService = userService;
    this._bookService = bookService;
  }

  viewAllBooks = async (req, res, next) => {
    const books = await this._bookService.getAllBooks();
    res.json({
      success: true,
      data: books,
    });
  }

  viewBook = async (req, res, next) => {
    const { bookId } = req.params;
    const book = await this._bookService.getBook(bookId);
    res.json({
      success: true,
      data: book,
    });
  }

  createBook = (req, res, next) => {
    const user = req.user;
    const data = req.data;
    const book = await this._bookService.createNewBook(data, user.id);
    if(!book) {
      return next(new InternalServerError("Error creating book, try again"));
    }
    
    res.json({
      success: true,
      data: book
    });
  }

  deleteBook = async (req, res, next) => {
    const { bookId } = req.params;
    await this._bookService.deleteBook(bookId);
    res.json({
      success: true,
      data: "Book deleted successfully"
    });
  }

  updateBook = async (req, res, next) => {
    const { bookId } = req.params;
    const data = req.body;
    const book = await this._bookService.updateBook(bookId, data);
    
    res.json({
      success: true,
      data: book
    });
  }

  addRating = async (req, res, next) => {
    const { bookId } = req.params;
    const { rating } = req.query;

    if(!isNumber(rating)) {
      return next(new BadRequestError("Invalid rating"));
    }

    const book = await this._bookService.addRating(
      bookId,
      rating,
      req.user.id,
    );

    res.json({
      success: true,
      data: book
    });
  }
}