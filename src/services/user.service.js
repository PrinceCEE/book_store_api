const userModel = require('../models/user.model.js');
const utils = require('../utils.js');

class UserService {
  constructor(model) {
    this._model = model;
  }

  emailExists = async email => {
    let user = await this._model.findOne({ email });
    return user !== null;
  }

  getUserByEmail = email => this._model.findOne({ email })

  getUserbyId = id => this._model.findOne({ _id: id })

  createNewUser = async data => {
    data.password = await utils.hashPassword(data.password);
    const newUser = new this._model(data);
    return newUser.save();
  }

  addBookToUser = async (user, bookId) => {
    user.books.push(bookId);
    await user.save();
  }

  removeBookFromUser = async (user, bookId) => {
    let index = user.books.findIndex(val => val.toString() === bookId);
    user.books.splice(index, 1);
    await user.save();
  }
}

module.exports = new UserService(userModel);