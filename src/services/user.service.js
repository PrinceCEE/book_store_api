import userModel from '../models/user.model';
import utils from '../utils';

class UserService {
  constructor(model) {
    this._model = model;
  }

  emailExists = async email => {
    let user = await this._model.findOne({ email });
    return user !== null;
  }

  getUserByEmail = email => this._model.userModel.findOne({ email })

  getUserbyId = id => this._model.userModel.findOne({ _id: id })

  createNewUser = async data => {
    data.password = await utils.hashPassword(data.password);
    const newUser = new this._model(data);
    return newUser.save();
  }
}

export default new UserService(userModel);