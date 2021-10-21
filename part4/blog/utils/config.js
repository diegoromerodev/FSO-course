require("dotenv").config();

const PORT = process.env.PORT || 3003;
const MONGO_URI =
  process.env.NODE_ENV === "test"
    ? "mongodb+srv://diegoromerodev:FamiliaRomero1@cluster0.uugy9.mongodb.net/blog-test?retryWrites=true&w=majority"
    : "mongodb+srv://diegoromerodev:FamiliaRomero1@cluster0.uugy9.mongodb.net/blog?retryWrites=true&w=majority";

module.exports = { PORT, MONGO_URI };
