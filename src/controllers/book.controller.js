export default class BookController {
  constructor(userService, bookService) {
    this._userService = userService;
    this._bookService = bookService;
  }

  viewAllBooks = (req, res, next) => {}

  viewBook = (req, res, next) => {}

  createBook = (req, res, next) => {}

  deleteBook = (req, res, next) => {}

  updateBook = (req, res, next) => {}

  addRating = (req, res, next) => {}
}