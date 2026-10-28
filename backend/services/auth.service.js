import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import Workspace from "../models/workspace.model.js";
import Project from "../models/project.model.js";
import Assistant from "../models/assistant.model.js";
import { generateToken } from "../utils/token.util.js";
import ApiError from "../utils/apiError.js";

class AuthService {
  /**
   * Register a new user and initialize workspace, project, and default assistant
   */
  async register({ name, email, password }) {
    if (!name || !email || !password) {
      throw new ApiError(400, "Name, email, and password are all required");
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (password.length < 6) {
      throw new ApiError(400, "Password must be at least 6 characters long");
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      throw new ApiError(400, "An account with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      assistantName: "Assistant",
      assistantImage: "",
    });

    // Create default workspace, project, and assistant for a rich experience
    const workspace = await Workspace.create({
      userId: user._id,
      name: "My Workspace",
      isDefault: true,
    });

    const project = await Project.create({
      workspaceId: workspace._id,
      name: "Personal",
      isDefault: true,
    });

    const assistant = await Assistant.create({
      userId: user._id,
      name: user.assistantName || "Parliament AI",
      description: "Your personal voice-enabled AI operating system",
      isDefault: true,
      defaultModel: "gemini-flash",
      visibility: "private",
    });

    const token = generateToken(user._id);

    return {
      user: user.toJSON(),
      token,
      workspace,
      project,
      assistant,
    };
  }

  /**
   * Authenticate an existing user
   */
  async login({ email, password }) {
    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ApiError(401, "Invalid email or password");
    }

    const token = generateToken(user._id);

    return {
      user: user.toJSON(),
      token,
    };
  }

  /**
   * Get user profile by ID
   */
  async getUserProfile(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User profile not found");
    }
    return user.toJSON();
  }
}

export default new AuthService();
