export default class UserController {
  constructor(userService, bookService) {
    this._userService = userService;
    this._bookService = bookService;
  }

  userPage = (req, res, next) => {}

  viewMyBooks = (req, res, next) => {}
}