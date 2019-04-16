const { decodeToken } = require("../utils/token");

const authMiddleware = async (req, res, next) => {
  try {
    const currentPath = req.path;
    let excluded = false;
    // if its an excluded path, get out of the middelware!

    // const details = decodeToken(req.headers.authorization);


    if(!req.session.authUser){
      throw new Error('You must login first!!!');
    }

    const details = decodeToken(req.session.authUser.token);

    if(details.userId != req.session.authUser.id){        //cheking if the token is tempered
      throw new Error('Unauthorised token ');
    }

    req.user = details;

    next();
  } catch (e) {
    console.log("error: ", e);
    return res.status(400).send("bruh, send me the right token?");
  }

};

module.exports = authMiddleware;
