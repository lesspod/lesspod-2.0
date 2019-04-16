const mongoose = require("mongoose");

const menuSchema = mongoose.Schema({
  menuName: String,
  underMenu: String,
  linkedTo: String,
  createdBy: String,
  createdAt: Number,
  updatedAt: Number
});

const formatMenu = {
  __v: 0
};

class Menu {
  constructor() {
    this.Menu = mongoose.model("menu", menuSchema, "menu");
  }

  create(menu) {
    let now = Date.now();
    menu.createdAt = now;
    menu.updatedAt = now;

    let newMenu = new this.Menu(menu);
    return newMenu.save();
  }

  get({ limit, skip } = { limit: 100, skip: 0 }) {
    return this.Menu.find({}, formatMenu)
      .limit(limit)
      .skip(skip);
  }

  getById(_id) {
    return this.Menu.findOne({ _id }, formatMenu);
  }

  getByMenuName(menuName){
    return this.Menu.findOne({ menuName }, formatMenu);
  }

  delete(_id) {
    return this.Menu.remove({ _id });
  }

  update(_id, data) {
    return this.Menu.findOneAndUpdate({ _id }, data, { new: true });
  }
}

module.exports = Menu;
