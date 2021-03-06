const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  author: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  url: String,
  likes: { type: Number, default: 0 },
});

blogSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
