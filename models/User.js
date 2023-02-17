const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  // Add whichever fields you need for your app
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Username is required."],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },

    hashedPassword: {
      type: String,
      required: [true, "Password is required."],
    },

    role: { 
      type: String, 
      enum: ['user', 'admin'], 
      default: 'user' 
    },
    isPremiumMember: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String,
      default:
        "https://media.vogue.mx/photos/62e19b3d4a4bcdd2c09a7c1b/2:3/w_1920,c_limit/GettyImages-1155131913-2.jpg",
    },
    password: {
      type: String,
    },
    facebookID: {
      type: String,
    },
    googleID: {
      type: String,
    },

    cardholderName: {
      type: String,
    },
    cardNumber: {
      type: String,
      // required: [true, "Card Number is required."],
    },
    expiryDate: {
      type: String,
    },
    cvv: {
      type: String,
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  {
    timestamps: true,
  },

  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
