const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 4, unique: true },
  favoriteGenre: { type: String, required: true, minlength: 4 },
  publishedBooks: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Book" }],
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", UserSchema);
