const Recipe = require("../models/recipeModel");

const recipeResolver = {
    Query:{
        getRecipe: async(_, { id }) =>{
            try{
                const recipe = await Recipe.findById(id);
                if(!recipe){
                    throw new Error("Recipe not found");
                }
                return recipe
            }catch(error){
                throw new Error(error.message);
            }
        },
        getAllRecipes: async() =>{
            try{
                const recipes = await Recipe.find(); 
                return recipes;
            }catch (error){
                console.error("Error fetching recipes:", error);
                throw new Error("Unable to fetch recipes");
            }
        }
    },

    Mutation:{
        addRecipe: async(_, { input }) =>{
            try{
                const newRecipe = new Recipe({
                    name: input.name,
                    body: input.body,
                    coverPhoto: input.coverPhoto,
                    macros:{
                        protein: input.macros.protein,
                        fat: input.macros.fat,
                        carbs: input.macros.carbs,
                        calories: input.macros.calories
                    },
                    type: input.type,
                    readTime: input.readTime,
                    cookTime: input.cookTime,
                    images: input.images
                })

                await newRecipe.save();
                return newRecipe;
            }catch(error){
                throw new Error("Error creating new recipe", error.message);
            }
        },

        editRecipe: async(_, { input }) =>{
            try{
                const recipe = await Recipe.findById(input.id);
                
                if(!recipe){
                    throw new Error("recipe not found");
                }

                // Update fields directly
                if (input.name) recipe.name = input.name;
                if (input.body) recipe.body = input.body;
                if (input.coverPhoto) recipe.coverPhoto = input.coverPhoto;
                if (input.macros) recipe.macros = { ...recipe.macros, ...input.macros };
                if (input.readTime) recipe.readTime = input.readTime;
                if (input.cookTime) recipe.cookTime = input.cookTime;
                if (input.images) recipe.images = input.images;   // Update fields directly
                if (input.name) recipe.name = input.name;
                if (input.body) recipe.body = input.body;
                if (input.coverPhoto) recipe.coverPhoto = input.coverPhoto;
                if (input.macros) recipe.macros = { ...recipe.macros, ...input.macros };
                if (input.readTime) recipe.readTime = input.readTime;
                if (input.cookTime) recipe.cookTime = input.cookTime;
                if (input.images) recipe.images = input.images;
                if (input.type) recipe.type = input.type;
                
                await recipe.save();
                return recipe;
            }catch(error){
                throw new Error("Failed to update recipe");
            }
        },

        deleteRecipe: async(_, { id }) =>{
            try{
                const recipe = await Recipe.findByIdAndDelete(id);

                if(!recipe){
                    throw new Error("recipe was not deleted");
                }
            }catch(error){
                throw new Error("Recipe was not deleted");
            }
        }
    }
}

module.exports = recipeResolver;