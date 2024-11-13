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