const mongoose = require('mongoose')

const trashedPostSchema = mongoose.Schema({
  post_id: { type: String},
  trashed_on: { type: Date, default: Date.now },
  title: String,
  content: String,
  author: String,     
  createdBy: String,
  createdAt: Number,
  updatedAt: Number
  });

  const formatTrash = {
    __v: 0
  };


class Trash {
  constructor() {
    this.Trash = mongoose.model("trashedPost", trashedPostSchema, "trashedPost");
  }

  create(post) {
    let now = Date.now();
         Trash.trashed_on = now;

    let trash1 = {
      title: post.title,
      content: post.content,
      author: post.author,
      createdBy: post.createdBy,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      post_id: post._id
    }

    let newPostTrash = new this.Trash(trash1);
    return newPostTrash.save();
  }

  get({ limit, skip } = { limit: 100, skip: 0 }) {
    return this.Trash.find({}, formatTrash)
      .limit(limit)
      .skip(skip);
  }

  getTrashedItems() {
    return this.Trash.findAll({ })
  }

  getTrashPostbyid(id){
    return this.Trash.findById(id);
  }

  delete(_id) {
    return this.Trash.remove({ _id });
  }
}

module.exports = Trash;
