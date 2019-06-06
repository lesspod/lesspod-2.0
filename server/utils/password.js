// const bcrypt = require("bcryptjs");

const hashPassword = password => {
  // let salt = bcrypt.genSaltSync(10);
  // let hash = bcrypt.hashSync(password, salt);
  
  let hash = password;
  return hash;
};

const comparePassword = (password, hash) => {
  return hash === password; 
};

module.exports = {
  hashPassword,
  comparePassword
};
