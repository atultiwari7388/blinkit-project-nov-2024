import CategoryModel from "../models/category.model.js";

export const AddCategoryController = async (req, res) => {
  try {
    const { name, image } = req.body;

    if (!name || !image) {
      return res.status(400).json({
        message: "All fields are required",
        error: true,
        success: false,
      });
    }

    const addCategory = new CategoryModel({
      name,
      image,
    });

    const savedCategory = await addCategory.save();

    if (!savedCategory) {
      return res.status(400).json({
        message: "Failed to add category",
        error: true,
        success: false,
      });
    }

    return res.status(201).json({
      message: "Category added successfully",
      data: savedCategory,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

export const getCategoryController = async (request, response) => {
  try {
    const data = await CategoryModel.find().sort({ createdAt: -1 });

    return response.json({
      data: data,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.messsage || error,
      error: true,
      success: false,
    });
  }
};
