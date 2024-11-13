import { gql } from '@apollo/client';

//! Queries
export const GET_RECIPES = gql`
    query getRecipe($id: ID!){
        getRecipe(id: $id){
            readTime
            name
            macros {
                protein
                fat
                carbs
                calories
            }
            coverPhoto
            cookTime
            body
            type
        }
    }
`

export const GET_ALL_RECIPES = gql`
    query getAllRecipes{
        getAllRecipes {
            _id
            readTime
            name
            macros {
                protein
                fat
                carbs
                calories
            }
            coverPhoto
            cookTime
            body
            type
        }
    }
`

//! Mutations
export const ADD_RECIPE = gql`
    mutation addRecipe($input: CreateRecipeInput!){
        addRecipe(input: $input){
            name
            body
            coverPhoto
            macros{
                protein
                fat
                carbs
                calories
            }
            type
            readTime
            cookTime
            images
        }
    }
    
`