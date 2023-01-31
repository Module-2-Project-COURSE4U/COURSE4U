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
    profilePicture: {
      type: String,
    },
    // fullName: {
    //   type: String,
    //   trim: true,
    //   required: true
    // },
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
    // googleID: {
    //   //we are going to use it when we create a social login account
    //   type: String,
    // },
    // facebookID: {
    //   //we are going to use it when we create a social login account
    //   type: String,
    // },
    // paymentCard: {
    //   //we are going to use this field for purchase simulation(fake)
    //   type: Number,
    //   required: [true, "Payment card is required."],
    // },
    // expiryDate: {
    //   type: Number,
    //   required: [true, "expiry date is required."],
    // },
    // cvv: {
    //   type: Number,
    //   required: [true, "CVV is required."],
    // },
    // nameOnCard: {
    //   type: String,
    //   required: [true, "card name is required."],
    // },
    country: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
