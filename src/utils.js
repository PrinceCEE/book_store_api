const { hash, genSalt } = require('bcrypt');

module.exports = {
  hashPassword: async function(pwd) {
    const salt = await genSalt(10);
    return hash(pwd, salt);
  },
};