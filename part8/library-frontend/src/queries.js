import {gql} from '@apollo/client';

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`;

export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            author
            published
        }
    }
`;

export const ADD_BOOK = gql`
    mutation addBookMutation(
        $title: String!
        $published: Int!
        $author: String!
        $genres: [String!]!
    ) {
        addBook(
            title: $title
            published: $published
            author: $author
            genres: $genres
        ) {
            title
            published
            author
        }
    }
`;

export const UPDATE_AUTHOR = gql`
    mutation editAuthor($name: String!, $born: Int!){
        editAuthor(name: $name, setBornTo: $born) {
            name
            born
        }
    }
`;