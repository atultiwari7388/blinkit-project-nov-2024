import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: Array,
      default: [],
      required: true,
    },
    category: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "category",
        required: true,
      },
    ],
    subCategory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "subCategory",
        required: true,
      },
    ],
    unit: {
      type: String,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    more_details: {
      type: Object,
      default: {},
    },
    publish: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

//create a text index
productSchema.index(
  {
    name: "text",
    description: "text",
  },
  {
    name: 10,
    description: 5,
  }
);

const ProductModel = mongoose.model("product", productSchema);

export default ProductModel;
