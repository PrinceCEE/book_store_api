class UserController {
  constructor(userService, bookService) {
    this._userService = userService;
    this._bookService = bookService;
  }

  userPage = (req, res, next) => {
    res.json({
      success: true,
      data: req.user,
    });
  }

  viewMyBooks = async (req, res, next) => {
    const user = req.user;
    const books = await this._bookService.getUserBooks(user.id);

    res.json({
      success: true,
      data: books
    });
  }
}

module.exports = UserController;