  const mongoose = require('mongoose')
    // const trashedPageSchema = mongoose.Schema({
    //   page_id: { type: String},
    //   trashed_on: { type: Date, default: Date.now },
    //   title: String,
    //   menuName: String,
    //   content: String,
    //   author: String,
    //   createdBy: String,
    //   createdAt: Number,
    //   updatedAt: Number
    //   });
    
    const trashedPageSchema = mongoose.Schema({
        menu_id: { type: String},
        trashed_on: { type: Date, default: Date.now },
        menuName: {
          type : String
        },
        underMenu: String,
        linkedTo: String,
        createdBy: String,
        createdAt: Number,
        updatedAt: Number
        });

    const formatTrash = {
        __v: 0
      };
    
    
    class Trash {
      constructor() {
        // this.Trash = mongoose.model("trashedPage", trashedPageSchema, "trashedPage");
        this.Trash = mongoose.model("trashedMenu", trashedPageSchema, "trashedMenu");
    
    }
    
      create(menu) {
        let now = Date.now();
        Trash.trashed_on = now;
    
        console.log('in TrashedMenu ', menu)
    
        // let trash1 = {
        //   title: page.title,
        //   content: page.content,
        //   author: page.author,
        //   createdBy: page.createdBy,
        //   createdAt: page.createdAt,
        //   updatedAt: page.updatedAt,
        //   page_id: page._id,
        //   menuName : page.menuName
        // }
        let trash1 = {
            linkedTo: menu.linkedTo,
            underMenu: menu.underMenu,
            createdBy: menu.createdBy,
            createdAt: menu.createdAt,
            updatedAt: menu.updatedAt,
            menu_id: menu._id,
            menuName : menu.menuName
          }
    
        let newMenuTrash = new this.Trash(trash1);
        return newMenuTrash.save();
      }
    
      get({ limit, skip } = { limit: 100, skip: 0 }) {
        return this.Trash.find({}, formatTrash)
          .limit(limit)
          .skip(skip);
      }
    
      // getTrashedItems() {
      //   return this.Trash.findAll({ })
      // }
    
      getTrashedMenuById(_id){
        return this.Trash.findById(_id);
      }

      getTrashedMenuMenuName(menuName){
        console.log(menuName)
        return this.Trash.findOne({menuName}, formatTrash);
      }
    
      delete(_id) {
        return this.Trash.deleteOne({_id : _id});
      }
    
      // deleteTrashbypage_id(page_id){
      //   return this.Trash.remove({page_id : page_id})
      // }
    
    }
    
    module.exports = Trash;
    