const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const fragranceSchema = new Schema(
  {
    base: {
      type: String,
      required: true,
      enum: ["floral", "gourmand", "oriental", "fresh", "woodsy"],
    },
    gender: {
      type: String,
      required: true,
      enum: ["masculine", "unisex", "feminine"],
    },
    ingredients: {
      type: String,
      required: true,
      enum: ["aquatic", "aromatic", "fruit", "floral", "woody", "spices"],
    },
  },
  {
    timestamps: true,
  }
);

const FragranceModel = mongoose.model("Fragrance", fragranceSchema);

module.exports = FragranceModel;
