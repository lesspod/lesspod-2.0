
const TrashedPageModel = require("../models/trashedPage");


module.exports = async (page) => {

    try {
      
      // body.author = req.session.authUser.fullname;       //saving the author name
      // body.createdBy = req.session.authUser.id;         //association with user model
      
      let Trash = new TrashedPageModel();

      console.log(page);
      
      let trashedPage = await Trash.create(page);
      console.log('trashed page created', trashedPage);

    } catch (e) {
      console.log("error ", e);
    }
}