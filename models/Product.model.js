const { Schema, model, default: mongoose } = require("mongoose");

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    stock: {
      type: Number,
      default: 100,
    },

    size: {
      type: Number,
      deafault: 50,
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model("Products", productSchema);

module.exports = ProductModel;