const mongoose = require('mongoose')

const trashSchema = mongoose.Schema({
  posts: [
    {
      post_id: { type: Schema.Types.ObjectId, ref: 'post' },
      trashed_on: { type: Date, default: Date.now }
    }
  ],
  pages: [
    {
      page_id: { type: Schema.Types.ObjectId, ref: 'page' },
      trashed_on: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true })

class Trash {
  constructor() {
    this.trash = mongoose.model("trash", trashSchema, "trash");
  }

  getTrashedItems() {
    return this.trash.findAll({ })
  }
}

module.exports = Trash;
