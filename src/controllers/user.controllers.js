import { User } from "../models/user.models.js";
import ApiError from "../utils/api-error.js";
import asyncHandler from "../utils/async-handler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import ApiResponse from "./../utils/api-response.js";

const registerUser = asyncHandler(async (req, res) => {
  //1.  get user details from frontend
  const { username, email, fullName, password } = req.body;

  // 2. validation - not empty
  if (
    [username, email, fullName, password].some(field => field.trim() === "")
  ) {
    throw new ApiError(400, "Please provide all fields");
  }

  // 3. check if user already exists in db, username or email
  const userExists = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (userExists) {
    throw new ApiError(409, "User with username or email already exists");
  }

  // 4. check for images, check for avatar
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Please provide an avatar");
  }

  // 5. upload them to cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) throw new ApiError(400, "Error while uploading avatar");

  // 6. create user object - save user to db
  const user = await User.create({
    username: username.toLowerCase(),
    email,
    fullName,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  // 7. remove password and refresh tokens from response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // 8. check for user creation
  if (!createdUser)
    throw new ApiError(500, "Something went wrong while registering the user");

  // 7. send response to frontend
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered Successfully"));
});

export { registerUser };
