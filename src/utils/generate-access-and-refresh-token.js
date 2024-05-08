import { User } from "../models/user.models.js";
import ApiError from "./api-error.js";

/**
 * Generates both access and refresh tokens for a given user.
 *
 * This function looks up a user by their unique identifier, then generates
 * an access token and a refresh token for that user. The refresh token is
 * saved to the user's record in the database for future validations. If an
 * error occurs during this process, it throws a custom API error.
 *
 * @param {string} userId - The unique identifier of the user.
 * @returns {Promise<Object>} An object containing both the access token and the refresh token.
 * @throws {ApiError} Throws an ApiError if something goes wrong during the token generation process.
 */

export const generateAccessAndRefreshTokens = async userId => {
  try {
    // Fetch the user from the database using the user ID
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Generate access and refresh tokens using methods defined in the User model
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Update the user's refresh token in the database
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // Return the tokens
    return { accessToken, refreshToken };
  } catch (err) {
    // If an error occurs, throw a custom API error with a status code and message
    throw new ApiError(
      err.statusCode || 500,
      err.message ||
        "Something went wrong while generating access token and refresh token"
    );
  }
};
