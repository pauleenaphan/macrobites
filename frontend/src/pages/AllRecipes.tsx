import { useQuery } from '@apollo/client';
import { GET_RECIPES, GET_ALL_RECIPES } from "../services/RecipeApi";
import { Recipe } from "../types/recipe";

export const AllRecipes = () =>{

    const { data: allRecipesData, loading, error } = useQuery(GET_ALL_RECIPES);
    const { data: recipeData } = useQuery(GET_RECIPES);

    if (loading) return <p>Loading recipes...</p>;
    if (error) return <p>Error loading recipes: {error.message}</p>;

    return(
        <section className="allRecipes">
            <p> Showing x amt of recipes </p>
            <section className="recipeType">
                <button> Breakfast </button>
                <button> Lunch </button>
                <button> Dinner </button>
                <button> Desert </button>
            </section>

            <section className="allRecipes">
                {allRecipesData.getAllRecipes.map((recipe: Recipe) => (
                    <div key={recipe.name}>
                        <h2> {recipe.name} </h2>
                        <p> {recipe.body} </p>
                        <p> {recipe.macros.protein}</p>
                    </div>
                ))}
            </section>
        </section>
    )
}