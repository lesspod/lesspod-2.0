const mongoose = require('mongoose')

// const trashSchema = mongoose.Schema({
//   pages: [
//     {
  //       page_id: { type: Schema.Types.ObjectId, ref: 'page' },
  //       trashed_on: { type: Date, default: Date.now }
//     }
//   ],
//   pages: [
//     {
//       page_id: { type: Schema.Types.ObjectId, ref: 'page' },
//       trashed_on: { type: Date, default: Date.now }
//     }
//   ]
// }, { timestamps: true })

const trashedPageSchema = mongoose.Schema({
  page_id: { type: String},
  trashed_on: { type: Date, default: Date.now },
  title: String,
  menuName: String,
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
    this.Trash = mongoose.model("trashedPage", trashedPageSchema, "trashedPage");
  }

  create(page) {
    let now = Date.now();
    Trash.trashed_on = now;

    console.log('in models ', page)

    let trash1 = {
      title: page.title,
      content: page.content,
      author: page.author,
      createdBy: page.createdBy,
      createdAt: page.createdAt,
      updatedAt: page.updatedAt,
      page_id: page._id,
      menuName : page.menuName
    }

    let newpageTrash = new this.Trash(trash1);
    return newpageTrash.save();
  }

  get({ limit, skip } = { limit: 100, skip: 0 }) {
    return this.Trash.find({}, formatTrash)
      .limit(limit)
      .skip(skip);
  }

  // getTrashedItems() {
  //   return this.Trash.findAll({ })
  // }

  getTrashedPageById(_id){
    return this.Trash.findById(_id);
  }

  delete(_id) {
    return this.Trash.remove({_id : _id});
  }

  // deleteTrashbypage_id(page_id){
  //   return this.Trash.remove({page_id : page_id})
  // }

}

module.exports = Trash;
