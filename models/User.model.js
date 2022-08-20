const { Schema, model, default: mongoose } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      //required: true,
    },
    lastName: {
      type: String,
      //required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    userRole: {
      type: String,
      enum: ["NORMAL", "ADMIN"],
      default: "NORMAL",
    },

    customFragranceOrdered: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Fragrance",
      },
    ],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const UserModel = model("User", userSchema);

module.exports = UserModel;

// cart: {
//   items: [
//     {
//       productId: {
//         type: mongoose.SchemaType.ObjectId,
//         ref: "Product",
//         required: true,
//       },
//       quantity: {
//         type: Number,
//         required: true,
//       },
//     },
//   ],
//   totalPrice: Number,
// },
