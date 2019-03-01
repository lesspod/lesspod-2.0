const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: String,
  content: String,
  author: String,
  createdBy: String,
  createdAt: Number,
  updatedAt: Number
});

const formatPost = {
  __v: 0
};

class Post {
  constructor() {
    this.Post = mongoose.model("post", postSchema, "post");
  }

  create(post) {
    let now = Date.now();
    post.createdAt = now;
    post.updatedAt = now;

    let newPost = new this.Post(post);
    return newPost.save();
  }

  get({ limit, skip } = { limit: 100, skip: 0 }) {
    return this.Post.find({}, formatPost)
      .limit(limit)
      .skip(skip);
  }

  getById(_id) {
    return this.Post.findOne({ _id }, formatPost);
  }

  update(_id, data) {
    console.log('updating a post (model)... '+ JSON.stringify(data));
    var query = { '_id' : _id },
    update = data,
    options = { upsert: true };

    // Find the document
    return this.Post.findOneAndUpdate(query, update, options, function(error, result) {
      if (error) console.log(error);
      // do something with the document
      });
  }


  delete(_id) {
    return this.Post.remove({ _id });
  }

  update(_id, data) {
    return this.Post.findOneAndUpdate({ _id }, data, { new: true });
  }
}

module.exports = Post;
