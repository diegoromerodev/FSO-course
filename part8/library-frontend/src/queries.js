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
            author {
                name
            }
            genres
            published
        }
    }
`;

export const GENRE_BOOKS = gql`
    query($genre: String!) {
        allBooks(genre: $genre) {
            title
            author {
                name
            }
            genres
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
            author: $author
            published: $published
            genres: $genres
        ) {
            title
            published
            author {
                name
                born
            }
        }
    }
`;

export const SESSION = gql`
    query {
        me {
            username
            favoriteGenre
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

export const USER_LOGIN = gql`
    mutation($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`;
