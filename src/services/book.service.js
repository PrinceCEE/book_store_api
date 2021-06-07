const bookModel = require('../models/book.model');

// using arrow functions for the binding of `this`
class BookService {
  constructor(model) {
    this._model = model;
  }

  getUserBooks = userId => this._model.find({ poster: userId })

  getAllBooks = () => this._model.find({})

  getBook = bookId => this._model.findOne({ _id: bookId })

  createNewBook = (data, userId) => {
    let newBook = new this._model({ ...data, poster: userId });
    return newBook.save();
  }

  deleteBook = bookId => this._model.findOneAndDelete({ _id: bookId })

  updateBook = (bookId, update) => this._model.findOneAndUpdate(
    {
      _id: bookId
    },
    update,
    {
      new: true,
    }
  )

  alreadyRated = async (bookId, userId) => {
    const { bookRating } = await this._model.findOne({ _id: bookId });
    const index = bookRating.users.findIndex(val => val.userId.toString() === userId);
 
    return index !== -1;
  }

  addRating = async (bookId, rating, userId) => {
    const book = await this._model.findOne({ _id: bookId });
    const { bookRating } = book;
    bookRating.users.push({
      userId: userId,
      rating: Number(rating)
    });

    // saving the cumulative ratings
    // so as to prevent long running looping
    bookRating.cumulative += parseInt(rating);
    bookRating.totalRating = bookRating.cumulative / bookRating.users.length;
    return book.save();
  }
}

module.exports = new BookService(bookModel);