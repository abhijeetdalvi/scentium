const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const fragranceSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["myself", "gift"],
    },
    mood: {
      type: String,
      required: true,
      enum: ["relaxed", "sexy", "fresh", "elegant"],
    },
    time: {
      type: String,
      required: true,
      enum: ["day", "night"],
    },
    gender: {
      type: String,
      required: true,
      enum: ["masculine", "unisex", "feminine"],
    },
    occassion: {
      type: String,
      required: true,
      enum: ["work", "sport", "romance", "lifestyle"],
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

const Fragrance = model("User", fragranceSchema);

module.exports = User;
