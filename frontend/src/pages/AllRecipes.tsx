import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GET_ALL_RECIPES } from "../services/RecipeApi";
import { Recipe } from "../types/recipe";

export const AllRecipes = () => {
    const navigate = useNavigate();
    const { data: allRecipesData, loading, error } = useQuery(GET_ALL_RECIPES);
    
    // State to store the selected recipe type
    const [selectedType, setSelectedType] = useState<string | null>(null);

    if (loading) return <p>Loading recipes...</p>;
    if (error) return <p>Error loading recipes: {error.message}</p>;

    // Filter the recipes based on the selected type
    const filteredRecipes = selectedType
        // If selected type is pressed then filter recipe based on type 
        ? allRecipesData.getAllRecipes.filter((recipe: Recipe) => recipe.type === selectedType)
        // Else just return all recipes
        : allRecipesData.getAllRecipes;

    return (
        <section className="allRecipes">
            <p> Showing {filteredRecipes.length} recipes </p>
            
            <section className="recipeType">
                <button onClick={() => setSelectedType('Breakfast')}> Breakfast </button>
                <button onClick={() => setSelectedType('Lunch')}> Lunch </button>
                <button onClick={() => setSelectedType('Dinner')}> Dinner </button>
                <button onClick={() => setSelectedType('Dessert')}> Dessert </button>
                <button onClick={() => setSelectedType(null)}> All </button>
            </section>

            <section className="allRecipes">
                {filteredRecipes.map((recipe: Recipe) => (
                    <div key={recipe._id} onClick={() => navigate(`/Recipe/${recipe._id}`)}>
                        <h2> {recipe.name} </h2>
                        <p> {recipe.body} </p>
                        <p> {recipe.macros.protein}</p>
                        <p> {recipe.type} </p>
                    </div>
                ))}
            </section>
        </section>
    );
};