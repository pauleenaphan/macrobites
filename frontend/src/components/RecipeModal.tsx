import React, { useState, useEffect } from 'react';

import { RecipeModalProps } from '../types/recipe';
import { ADD_RECIPE, GET_RECIPE, EDIT_RECIPE } from '../services/RecipeApi';
import { useMutation, useQuery } from '@apollo/client';

export const RecipeModal: React.FC<RecipeModalProps> = ({ isOpen, onClose, mode, recipeId}) => {
    // console.log("mode", mode);
    // console.log("recipeId", recipeId);
    const [formData, setFormData] = useState({
        name: '',
        body: '',
        coverPhoto: '',
        protein: 0,
        fat: 0,
        carbs: 0,
        calories: 0,
        type: '',
        readTime: '',
        cookTime: '',
        images: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        // If we don't have this we get an error because html does not auto convert values into a number even though
        // input is a number 
        if (name === 'protein' || name === 'fat' || name === 'carbs' || name === 'calories') {
            setFormData({
                ...formData,
                [name]: value ? parseFloat(value) : 0 // Convert to number
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const { data: recipeData } = useQuery(GET_RECIPE, {
        variables: { id: recipeId },
        skip: mode !== "edit"  
    });

    const [addRecipe] = useMutation(ADD_RECIPE);
    const [editRecipe] = useMutation(EDIT_RECIPE);

    useEffect(() => {
        if(recipeData && recipeData.getRecipe){
            const recipe = recipeData.getRecipe;
            setFormData({
                name: recipe.name || '',
                body: recipe.body || '',
                coverPhoto: recipe.coverPhoto || '',
                protein: recipe.macros.protein || 0,
                fat: recipe.macros.fat || 0,
                carbs: recipe.macros.carbs || 0,
                calories: recipe.macros.calories || 0,
                type: recipe.type || '',
                readTime: recipe.readTime || '',
                cookTime: recipe.cookTime || '',
                images: recipe.images || ''
            });
        }
    }, [recipeData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (mode === 'add') {
            // Handle adding the recipe
            console.log('Adding new recipe:', formData);
            try{
                console.log("Cover Photo:", formData.coverPhoto);
                console.log("Images:", formData.images);
                await addRecipe({
                    variables:{
                        input:{
                            name: formData.name,
                            body: formData.body,
                            coverPhoto: formData.coverPhoto,
                            macros:{
                                protein: formData.protein,
                                fat: formData.fat,
                                carbs: formData.carbs,
                                calories: formData.calories
                            },
                            type: formData.type,
                            readTime: formData.readTime,
                            cookTime: formData.cookTime,
                            images: formData.images
                        }
                    }
                })
            }catch(error){
                console.error("Error creatingn recipe", error);
            }

        } else if (mode === 'edit') {
            try {
                console.log("Sending editRecipe input:", formData);
                console.log("recipe id", recipeId);
                await editRecipe({
                    variables: {
                        input: {
                            _id: recipeId,
                            name: formData.name,
                            body: formData.body,
                            coverPhoto: formData.coverPhoto,
                            macros: {
                                protein: formData.protein,
                                fat: formData.fat,
                                carbs: formData.carbs,
                                calories: formData.calories
                            },
                            type: formData.type,
                            readTime: formData.readTime,
                            cookTime: formData.cookTime,
                            images: formData.images
                        }
                    }
                });
                console.log('Recipe updated successfully');
            } catch (error) {
                console.error('Error updating recipe', error);
            }
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <form onSubmit={handleSubmit} className="recipeForm">
                <h2>{mode === 'add' ? 'Add New Recipe' : 'Edit Recipe'}</h2>

                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Recipe Name" />

                <label>Body</label>
                <textarea name="body" value={formData.body} onChange={handleInputChange} placeholder="Recipe Body" />

                <label>Cover Photo</label>
                <input type="text" name="coverPhoto" value={formData.coverPhoto} onChange={handleInputChange} placeholder="Cover Photo"/>

                <label>Protein</label>
                <input type="number" name="protein" value={formData.protein} onChange={handleInputChange} placeholder="Protein" />

                <label>Fat</label>
                <input type="number" name="fat" value={formData.fat} onChange={handleInputChange} placeholder="Fat" />

                <label>Carbs</label>
                <input type="number" name="carbs" value={formData.carbs} onChange={handleInputChange} placeholder="Carbs" />

                <label>Calories</label>
                <input type="number" name="calories" value={formData.calories} onChange={handleInputChange} placeholder="Calories" />

                <label>Meal Type</label>
                <select name="type" value={formData.type} onChange={handleInputChange}>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Dessert">Dessert</option>
                </select>

                <label>Read Time</label>
                <input type="text" name="readTime" value={formData.readTime} onChange={handleInputChange} placeholder="Read Time" />

                <label>Cook Time</label>
                <input type="text" name="cookTime" value={formData.cookTime} onChange={handleInputChange} placeholder="Cook Time" />

                <label> Images </label>
                <input type="text" name="images" value={formData.images} onChange={handleInputChange} placeholder="Images of your food"/>

                <button type="submit">{mode === 'add' ? 'Add Recipe' : 'Save Changes'}</button>
                <button type="button" onClick={onClose}>Close</button>
            </form>
        </div>
    );
};