const { gql } = require('apollo-server');

const recipeDefs = gql`
    type Recipe{
        name: String,
        body: String,
        coverPhoto: String,
        macros: {
            protein: Number,
            fat: Number,
            carbs: Number,
            calories: Number
        },
        readTime: String,
        cookTime: String, 
        images: String
    }

    type Query{
        getRecipe(id: ID!) : Recipe
        getAllRecipes(id: ID!) : Recipe
    }

    type Mutation{
        addRecipe(input: CreateRecipeInput!) : Recipe
        editRecipe(input: EditRecipeInput!) : Recipe
        deleteRecipe(id: ID!) : Recipe
    }

    input CreateRecipeInput{
        name: String!,
        body: String!,
        coverPhoto: String,
        macros: {
            protein: Number!,
            fat: Number!,
            carbs: Number!,
            calories: Number!
        },
        readTime: String!,
        cookTime: String!, 
        images: String
    }

    input EditRecipeInput{
        name: String,
        body: String,
        coverPhoto: String,
        macros: {
            protein: Number,
            fat: Number,
            carbs: Number,
            calories: Number
        },
        readTime: String,
        cookTime: String, 
        images: String
    }
`

module.exports = recipeDefs;