const isNumber = require('is-number');
const { InternalServerError, BadRequestError } = require("../errors.js");

class BookController {
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

  createBook = async (req, res, next) => {
    const user = req.user;
    const data = req.body;
    const book = await this._bookService.createNewBook(data, user.id);
    if(!book) {
      return next(new InternalServerError("Error creating book, try again"));
    }
    
    // save book to the user's book list
    await this._userService.addBookToUser(user, book.id);
    res.json({
      success: true,
      data: book
    });
  }

  deleteBook = async (req, res, next) => {
    const { bookId } = req.params;
    const user = req.user;
    const book = await this._bookService.deleteBook(bookId);

    // remove book from the user's book list
    await this._userService.removeBookFromUser(user, book.id);
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
      return next(new BadRequestError("Invalid rating value"));
    }

    if(Number(rating) > 5 || Number(rating) < 0) {
      return next(new BadRequestError("Invalid rating value, value should be between 0 and 5"));
    }

    let book;
    try {
      book = await this._bookService.addRating(
        bookId,
        rating,
        req.user.id,
      );
    } catch(err) {
      return next(new BadRequestError(err.message));
    }

    res.json({
      success: true,
      data: book
    });
  }
}

module.exports = BookController;