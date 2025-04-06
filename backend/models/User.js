import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Username of the user
    username: {
      type: String,
      required: [true, "Username is required."],
      trim: true,
      maxlength: [20, "Username must be at most 20 characters."],
    },
    // Email address of the user
    email: {
      type: String,
      required: [true, "Email address is required."],
      trim: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Invalid email address.",
      ],
    },
    // User password
    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [4, "Password must be at least 4 characters."],
      maxlength: [10, "Password must be at most 10 characters."],
    },
    // Indicates whether the user is an admin
    admin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
