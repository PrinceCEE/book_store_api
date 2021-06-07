import { Router } from 'express';
import bookRoutes from '../routes/book.route';
import BookMiddleware from '../middlewares/book.middleware';
import BookController from '../controllers/book.controller';
import AuthMiddleware from '../middlewares/auth.middleware';

const router = Router();
const bookMiddleware = new BookMiddleware();
const bookController = new BookController();
const authMiddleware = new AuthMiddleware();

// view all books, including guests
router.get(
  bookRoutes.all,
  bookController.viewAllBooks,
);

// everybody can view a book
router.get(
  bookRoutes.viewBook,
  bookMiddleware.viewBook,
  bookController.viewBook,
);

// Only registered users can create a book
router.post(
  bookRoutes.createBook,
  authMiddleware.verifyUser,
  bookMiddleware.createBook,
  bookController.createBook,
);

// Only the user that created the book
router.post(
  bookRoutes.deletebook,
  authMiddleware.verifyUser,
  bookMiddleware.validateAccess,
  bookController.deleteBook,
);

// Only the user that created the book
router.post(
  bookRoutes.updateBook,
  authMiddleware.verifyUser,
  bookMiddleware.validateAccess,
  bookMiddleware.updateBook,
  bookController.updateBook,
);

// only for registered users
router.post(
  bookRoutes.addRating,
  authMiddleware.verifyUser,
  bookController.addRating,
);

router.path = "/books";

export default router;