
const TrashedMenuModel = require("../models/trashedMenu"),
    menuModel = require("../models/menu");

module.exports = async (menu) => {

    try {
      
      // body.author = req.session.authUser.fullname;       //saving the author name
      // body.createdBy = req.session.authUser.id;         //association with user model
      
      let Trash = new TrashedMenuModel();
      let Menu = new menuModel();


      console.log('menu returned from post');
      console.log(menu);
      
      let trashedMenu = await Trash.create(menu);
      console.log('trashed menu created', trashedMenu);

    } catch (e) {
      console.log("error ", e);
    }
}