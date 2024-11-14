export interface Recipe {
    _id: string;
    name: string;
    body: string;
    coverPhoto: string;
    macros: {
        protein: number,
        fat: number,
        carbs: number,
        calories: number
    }
    readTime: number;
    cookTime: number;
    images: string[];
    type: string;
}

export interface RecipeModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: string;  // The mode can either be 'add' or 'edit'
    recipeId: string | null;
}