import { hash, genSalt } from 'bcrypt';

export default {
  hashPassword: async function(pwd) {
    const salt = genSalt(10);
    return hash(pwd, salt);
  },
};