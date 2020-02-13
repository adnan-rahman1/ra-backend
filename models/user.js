const { Schema, model } =require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    max: 32,
    index: true,
    unique: true
  },
  bio: {
    type: String,
    max: 400,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    defautl: "subscriber"
  },
  resetPasswordLink: {
    data: String,
    default: "",
  }
}, {
  timestamps: true
});

// userSchema.set('toObject', { virtuals: true })
// userSchema.set('toJSON', { virtuals: true })

userSchema.pre('save', async function (next) {
  this.password = await this.getHashPassword(this.password, await this.getSalt());
  next();
})

// method
userSchema.methods = {
  getSalt: async function () {
    try {
      return await bcrypt.genSalt(10)
    } catch (err) {
      return "";
    }
  },
  getHashPassword: async function (password, salt) {
    try {
      if (!password) return "";
      else {
        return await bcrypt.hash(password, salt)
      }
    } catch (err) {
      return "";
    }
  },
  comparePassword: async function (plainPassword) {
    try {
      return await bcrypt.compare(plainPassword, this.password)
    } catch (err) {
      return false;
    }
  }
}

module.exports = model('User', userSchema);