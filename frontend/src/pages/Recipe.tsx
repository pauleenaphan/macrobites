import { useParams } from 'react-router-dom';
import { GET_RECIPE } from '../services/RecipeApi';
import { useQuery } from '@apollo/client';

export const Recipe = () =>{
    const { recipeId } = useParams<{ recipeId: string }>();
    console.log("recipeId", recipeId);

    const { data: recipeData, loading, error } = useQuery(GET_RECIPE, {
        variables: { id: recipeId }
    })

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const recipe = recipeData.getRecipe;

    return(
        <section className="recipePage">
            <h1> {recipe.name} </h1>
            <p> Read Time: {recipe.readTime} </p>
            <p> Cook Time: {recipe.cookTime} </p>
        </section>
    )
}