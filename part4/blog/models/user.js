const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new mongoose.Schema({
  username: { required: true, type: String, minlength: 3, unique: true },
  name: String,
  password: { required: true, type: String, minlength: 3 },
  blogs: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Blog",
    },
  ],
});

UserSchema.set("toJSON", {
  transform(doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.password;
  },
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", UserSchema);
