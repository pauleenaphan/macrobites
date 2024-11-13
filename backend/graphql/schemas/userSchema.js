// Allows you to define graphql schema using sdl syntax
const { gql } = require('apollo-server');

const userDefs = gql`
    type User{
        _id: ID!,
        name: String,
        email: String,
        password: String,
        role: String
    }

    # Our getter functions
    type Query{
        # Defining return type (User)
        getUser(id: ID!) : User
    }

    # Our setters
    type Mutation{
        createUser(input: CreateUserInput!) : User
        deleteUser(id: ID!) : User
    }

    # Creates input for our mutation 
    input CreateUserInput{
        name: String!,
        email: String!,
        password: String!,
        role: String
    }
`

module.exports = userDefs;