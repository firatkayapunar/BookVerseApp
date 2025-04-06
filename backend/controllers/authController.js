import User from "../models/User.js";
import { checkValidationError } from "../utils/index.js";

const registerUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "This email address is already registered!",
      });
    }

    const user = await User.create({
      email,
      password,
      username,
    });

    return res.status(201).json({
      success: true,
      message: "The user has been created successfully.",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errorResponse = checkValidationError(error); // (utils/index.js'den import ettik.)
      return res.status(400).json(errorResponse);
    } else {
      return res
        .status(500)
        .json({ error: error.message || "Internal Server Error." });
    }
  }
};

export { registerUser };
