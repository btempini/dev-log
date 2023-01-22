const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  bio: {
    type: String,
    maxlength: 200,
  },
  DevLvl: {
    type: String,
    required: true,
    default: "Noob",
  },
  github: {
    type: String,
  },
  profilePhoto: {
    type: String,
    default:
      "https://images-ext-1.discordapp.net/external/HZshEEBeh8C2_hHpM2tSIx7WahHkc54zV-BZfFvyQQs/https/devlog-bucket-2023.s3.us-west-1.amazonaws.com/Avatar.png",
  },
});

//set up pre-save middleware to create a password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});
userSchema.pre("insertMany", async function (next, docs) {
  const saltRounds = 10;
  docs.forEach((element) => {
    element.password = bcrypt.hashSync(element.password, saltRounds);
  });
  next();
});

//compares the entered password to the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
// please work

const User = model("User", userSchema);

module.exports = User;
