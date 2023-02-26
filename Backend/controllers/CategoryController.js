import Categories from "../models/CategoryModel.js";

export const getCategories = async(req, res) => {
    try {
        const categories = await Categories.find();
        res.status(200).json(categories);
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}

export const getCategoryById = async(req, res) => {
    try {
        const category = await Categories.findById(req.params.id);
        res.json(category);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

export const saveCategory = async(req, res) => {
    const category = new Categories(req.body);
    try {
        const insertedCategory = await category.save();
        res.status(201).json(insertedCategory);
    } catch(error) {
        res.status(400).json({message: error.message});
    }
}

export const deleteCategory = async(req, res) => {
    try {
        const deletedCategory = await Quiz.deleteOne({_id: req.params.id});
        res.status(200).json(deletedCategory)
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}