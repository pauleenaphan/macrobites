const { gql } = require('apollo-server');

const recipeDefs = gql`
    type Macros{
        protein: Int,
        fat: Int,
        carbs: Int,
        calories: Int
    }

    type Recipe{
        _id: ID,
        name: String,
        body: String,
        coverPhoto: String,
        macros: Macros,
        readTime: String,
        cookTime: String,
        images: String,
        type: String
    }

    type Query{
        getRecipe(id: ID!) : Recipe
        getAllRecipes: [Recipe]
    }

    type Mutation{
        addRecipe(input: CreateRecipeInput!) : Recipe
        editRecipe(input: EditRecipeInput!) : Recipe
        deleteRecipe(id: ID!) : Recipe
    }

    input MacrosInput{
        protein: Int!
        fat: Int!
        carbs: Int!
        calories: Int!
    }

    input CreateRecipeInput{
        name: String!
        body: String!
        coverPhoto: String!
        macros: MacrosInput!
        readTime: String!
        cookTime: String!
        images: String!
        type: String!
    }

    input EditRecipeInput{
        _id: ID!
        name: String
        body: String
        coverPhoto: String
        macros: MacrosInput
        readTime: String
        cookTime: String
        images: String
        type: String
    } 
`

module.exports = recipeDefs;
