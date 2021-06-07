import { BadRequestError, UnAuthorizedError } from '../errors';
import { createBookSchema, updateBookSchema } from '../validators';

export default class BookMiddleware {
  constructor(userService, bookService) {
    this._userService = userService;
    this._bookService = bookService;
  }

  viewBook = async (req, res, next) => {
    const { bookId } = req.params;
    const book = await this._bookService.getBook(bookId);

    if(!book) {
      return next(new BadRequestError("Book doesn't exist"));
    }

    next();
  }

  createbook = (req, res, next) => {
    const body = req.body;
    const { error } = createBookSchema.validate(body);
    if(error) {
      return next(new BadRequestError(error.message));
    }
    next();
  }

  validateAccess = (req, res, next) => {
    const { bookId } = req.params;
    const user = req.user;

    const isFound = user.books.find(val => val.toString() === bookId);
    if(!isFound) {
      return next(new UnAuthorizedError("You are not authorised to perferm this request"));
    }
    next();
  }

  updateBook = (req, res, next) => {
    const { error } = updateBookSchema.validate(req.body);
    if(error) {
      return next(new BadRequestError(error.message))
    }
    next();
  }
}