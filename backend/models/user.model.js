import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    authProvider: {
      type: String,
      enum: ["local", "google", "github", "apple"],
      default: "local",
    },
    providerId: {
      type: String,
      default: null,
    },
    assistantName: {
      type: String,
      default: "Assistant",
      trim: true,
    },
    assistantImage: {
      type: String,
      default: "",
    },
    history: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// Strip password from JSON serialization automatically
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const User = mongoose.model("User", userSchema);

export default User;
