const mongoose = require("mongoose");

const pageSchema = mongoose.Schema({
  title: String,
  menuName: String,
  content: String,
  author: String,
  createdBy: String,
  createdAt: Number,
  updatedAt: Number
});

const formatPage = {
  __v: 0
};

class Page {
  constructor() {
    this.Page = mongoose.model("page", pageSchema, "page");
  }

  create(page) {
    let now = Date.now();
    page.createdAt = now;
    page.updatedAt = now;

    let newPage = new this.Page(page);
    return newPage.save();
  }

  get({ limit, skip } = { limit: 100, skip: 0 }) {
    return this.Page.find({}, formatPage)
      .limit(limit)
      .skip(skip);
  }

  getById(_id) {
    return this.Page.findOne({ _id }, formatPage);
  }

  delete(_id) {
    return this.Page.remove({ _id });
  }

  update(id, data) {
    return this.Page.findOneAndUpdate({ _id }, data, { new: true });
  }
}

module.exports = Page;
