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
    mode: 'add' | 'edit';  // The mode can either be 'add' or 'edit'
    initialData?: {
        name: string;
        body: string;
        protein: number;
        fat: number;
        carbs: number;
        calories: number;
        type: string;
        readTime: string;
        cookTime: string;
    };
}