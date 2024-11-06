const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: { type: String, required: true },
    body: { type: String, required: true },
    coverPhoto: { type: String },
    macros: {
        protein: Number,
        fat: Number,
        carbs: Number,
        calories: Number
    },
    readTime: { type: String, required: true },
    cookTime: { type: String, required: true },
    images: { type: [String] }
})

modules.exports = mongoose.model("Recipe", recipeSchema);