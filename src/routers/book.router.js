const { Router } = require('express');
const bookRoutes = require('../routes/book.route');
const BookMiddleware = require('../middlewares/book.middleware');
const BookController = require('../controllers/book.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');
const userService = require('../services/user.service');
const bookService = require('../services/book.service');
const authService = require('../services/auth.service');

const router = Router();
const bookMiddleware = new BookMiddleware(
  userService,
  bookService,
);
const bookController = new BookController(
  userService,
  bookService,
);
const authMiddleware = new AuthMiddleware(
  authService,
  userService
);

// view all books, including guests
router.get(
  bookRoutes.all,
  bookController.viewAllBooks,
);

// everybody can view a book
router.get(
  bookRoutes.viewBook,
  bookMiddleware.bookExists,
  bookController.viewBook,
);

// Only registered users can create a book
router.post(
  bookRoutes.createBook,
  authMiddleware.verifyUser,
  bookMiddleware.createbook,
  bookController.createBook,
);

// Only the user that created the book
router.post(
  bookRoutes.deletebook,
  authMiddleware.verifyUser,
  bookMiddleware.bookExists,
  bookMiddleware.validateAccess,
  bookController.deleteBook,
);

// Only the user that created the book
router.post(
  bookRoutes.updateBook,
  authMiddleware.verifyUser,
  bookMiddleware.bookExists,
  bookMiddleware.validateAccess,
  bookMiddleware.updateBook,
  bookController.updateBook,
);

// only for registered users
router.post(
  bookRoutes.addRating,
  authMiddleware.verifyUser,
  bookMiddleware.bookExists,
  bookMiddleware.verifyAlreadyRated,
  bookController.addRating,
);

router.path = "/books";

module.exports = router;