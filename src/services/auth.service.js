import jsonwebtoken from 'jsonwebtoken';

class AuthService {
  getToken = payload => jsonwebtoken.sign(payload)
}

export default new AuthService();