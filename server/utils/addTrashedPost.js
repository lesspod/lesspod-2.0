
const TrashedPostModel = require("../models/trashedPost");


module.exports = async (post) => {

    try {
      
      // body.author = req.session.authUser.fullname;       //saving the author name
      // body.createdBy = req.session.authUser.id;         //association with user model
      
      let Trash = new TrashedPostModel();
      
      let trashedPost = await Trash.create(post);
      console.log('trashed post created', trashedPost);

    } catch (e) {
      console.log("error ", e);
    }
}