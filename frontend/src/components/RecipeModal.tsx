import React, { useState } from 'react';

import { RecipeModalProps } from '../types/recipe';

export const RecipeModal: React.FC<RecipeModalProps> = ({ isOpen, onClose, mode}) => {
    const [formData, setFormData] = useState({
        name: '',
        body: '',
        protein: 0,
        fat: 0,
        carbs: 0,
        calories: 0,
        type: '',
        readTime: '',
        cookTime: ''
    });

    // If in 'edit' mode, pre-fill the form with the existing data
    // useEffect(() => {
    //     if (mode === 'edit' && initialData) {
    //         setFormData(initialData);
    //     }
    // }, [mode, initialData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (mode === 'add') {
            // Handle adding the recipe
            console.log('Adding new recipe:', formData);
        } else if (mode === 'edit') {
            // Handle editing the existing recipe
            console.log('Editing recipe:', formData);
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

                <button type="submit">{mode === 'add' ? 'Add Recipe' : 'Save Changes'}</button>
                <button type="button" onClick={onClose}>Close</button>
            </form>
        </div>
    );
};