import { gql } from '@apollo/client';

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