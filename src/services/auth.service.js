const jsonwebtoken = require('jsonwebtoken');

class AuthService {
  getToken = payload => jsonwebtoken.sign(
    payload,
    process.env.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  )
}

module.exports = new AuthService();