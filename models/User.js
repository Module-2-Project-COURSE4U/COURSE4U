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
    nameOnCard: { 
      type: String, 
      required: [true, "Card name is required."],
    },
    cardNumber: { 
      type: Number, 
      required: [true, "Card Number is required."],
    },
    expirationDate: { 
      type: Date, 
      required: [true, "Expiration Date is required."],
    },
    cvv: { 
      type: String, 
      required: [true, "Cvv is required."],
     },
    country: {
       type: String, 
       required: [true, "Coutry name is required."]
    },
    Courses: [{
      type: Schema.Types.ObjectId,
      ref: "Course",
    }],
    
    hashedPassword: {
      type: String,
      required: [true, "Password is required."],
    },
    imageUrl: {
      type: String,
      default:
        "https://media.vogue.mx/photos/62e19b3d4a4bcdd2c09a7c1b/2:3/w_1920,c_limit/GettyImages-1155131913-2.jpg",
    },
    my_courses:[
      {
        type: Schema.Types.ObjectId,
        ref: 'Course'
      }
    ]
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
