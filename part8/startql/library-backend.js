const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require("apollo-server");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoose = require("mongoose");
const Book = require("./models/Book");
const Author = require("./models/Author");
const User = require("./models/User");

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("connected to mongo");
});

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      id: ID
      genres: [String!]!
    ): Book

    createUser(username: String!, favoriteGenre: String!): User

    login(username: String!, password: String!): Token

    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Author: {
    bookCount: async (root) => {
      const authored = await Book.find({ author: root.id });
      return authored.length;
    },
  },

  Query: {
    bookCount: async (root, args) => {
      const allBooks = await Book.find();
      return allBooks.length;
    },
    authorCount: async (root, args) => {
      const allAuthors = await Author.find();
      return allAuthors.length();
    },
    allBooks: async (root, args) => {
      const books = await Book.find().populate("author");
      if (args.author || args.genre) {
        return books.filter((b) => {
          if (!args.author || !args.genre) {
            return (
              b.author.name === args.author || b.genres.includes(args.genre)
            );
          }
          return b.author.name === args.author && b.genres.includes(args.genre);
        });
      }
      return books;
    },
    allAuthors: async (root, args) => {
      return await Author.find();
    },
    me: (root, args, { currentUser }) => {
      return currentUser;
    },
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser)
        throw new AuthenticationError(
          "you need to be logged in to perform this action"
        );
      const dupe = await Book.findOne({ title: args.title });
      if (dupe) throw new UserInputError("duplicate book");
      const author = await Author.findOne({ name: args.author });
      try {
        const newBook = new Book({ ...args, author });
        return newBook.save();
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        });
      }
    },
    editAuthor: async (root, args) => {
      if (!currentUser)
        throw new AuthenticationError(
          "you need to be logged in to perform this action"
        );

      const toEdit = await Author.findOne({ name: args.name });
      toEdit.born = args.setBornTo;
      return toEdit.save();
    },
    createUser: async (root, args) => {
      const newUser = new User({ ...args });
      try {
        await newUser.save();
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        });
      }
      return newUser;
    },
    login: (root, args) => {
      if (args.password !== "diego")
        throw new AuthenticationError("wrong credentials");
      const foundUser = User.findOne({ username: args.username });
      if (foundUser) {
        const token = jwt.sign(
          { id: foundUser._id, username: foundUser.username },
          process.env.SECRET
        );
        return { value: token };
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    if (
      req.headers.authorization &&
      req.headers.authorization.toLowerCase().includes("bearer")
    ) {
      const token = req.headers.authorization.split(" ")[1];
      const tokenVal = jwt.verify(token, process.env.SECRET);
      const currentUser = User.findById(tokenVal.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
