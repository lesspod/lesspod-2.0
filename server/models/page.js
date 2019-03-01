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

  update(_id, data) {
    console.log('updating a page (model)... '+ JSON.stringify(data));
    var query = { '_id' : _id },
    update = data,
    options = { upsert: true };

    // Find the document
    return this.Page.findOneAndUpdate(query, update, options, function(error, result) {
      if (error) console.log(error);
      // do something with the document
      });

    // return this.Page.findByIdAndUpdate(_id, {$set:{data}}, { new: true });
  }
}

module.exports = Page;
