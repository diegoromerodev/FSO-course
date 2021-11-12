const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 4,
    },
    born: {
      type: Number,
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.bookCount = doc.publishedBooks.length;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("Author", schema);
