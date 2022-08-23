const { Schema, model, default: mongoose } = require("mongoose");
const UserModel = require("./User.model");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const fragranceSchema = new Schema(
  {
    base: {
      type: String,
      required: true,
      //enum: "floral",
      enum: ["floral", "gourmand", "oriental", "fresh", "woodsy"],
    },
    top: {
      type: String,
      required: true,
      //enum: "sensual",
      enum: ["sensual", "confident", "sexy", "comforting", "peaceful"],
    },
    orderedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const FragranceModel = model("Fragrance", fragranceSchema);

module.exports = FragranceModel;
