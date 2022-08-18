const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const fragranceSchema = new Schema(
  {
    base: {
      type: String,
      //required: true,
      enum: ["floral", "gourmand", "oriental", "fresh", "woodsy"],
    },
    top: {
      type: String,
      //required: true,
      enum: ["sensual", "confident", "sexy", "comforting", "peaceful"],
    },
  },
  {
    timestamps: true,
  }
);

const FragranceModel = model("Fragrance", fragranceSchema);

module.exports = FragranceModel;
