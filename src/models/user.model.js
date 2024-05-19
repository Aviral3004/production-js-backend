import mongoose, { Schema } from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
  {
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true, // use index for faster and optimized searching in DB using this object 'username'
    },
    email: {
      type: String,
      required: true,
      required: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // cloudinary url
      required: true,
    },
    coverImage: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
)

//before sending data to mongoDB we encrypt the password using pre middleware in mongoosex
// as we need the 'this' keyword to access objects of userSchema hence we don't use arrow function
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next() // when password is not modified we
  // don't want to rehash it and directly move to next middleware.
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

// we can use implement custom methods/functions
//with the help of userSchema.methods.<custom_method_name>

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password) // compare the entered passoword by user and encrypted password
  // in the DB for that user
}

//for generating access token before saving the user in DB

userSchema.methods.generateAcessToken = function () {
  jwt.sign(
    // first we give payload (data)
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },

    // Then we give access token from .env file
    process.env.ACCESS_TOKEN_SECRET,

    // then we give an expiration object that gets the expiration time from .env file
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  )
}

//for generating refresh token before saving the user in DB

userSchema.methods.generateRefreshToken = function () {
  jwt.sign(
    // basically refresh token has less payload
    // as it is just used for generating a new access token
    // first we give payload (data)
    {
      _id: this._id,
    },

    // Then we give refresh token from .env file
    process.env.REFRESH_TOKEN_SECRET,

    // then we give an expiration object that gets the expiration time from .env file
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  )
}

export const User = mongoose.model("User", userSchema)
