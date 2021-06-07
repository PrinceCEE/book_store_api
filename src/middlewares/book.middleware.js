export default class BookMiddleware {
  constructor(userService, bookService) {
    this._userService = userService;
    this._bookService = bookService;
  }

  viewBook = (req, res, next) => {}

  validateAccess = (req, res, next) => {}
}