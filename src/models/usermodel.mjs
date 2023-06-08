import mongoose, { model } from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';
const { Schema } = mongoose;

const user = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: 'Invalid email address',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
  wilaya_code: {
    type: Number,
    required: true,
    ref: 'adresses',
    select: 'wilaya_code',
    validate: {
      validator: Number.isInteger,
      message: 'Wilaya code must be an integer.',
    },
  },
});
// تشفير كلمة المرور
user.pre('save', async function () {
  if (this.isModified('password')) {
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
  }
});
// مقارنة كلمة المرور
user.methods.comparePassword = async function (userPassword) {
  return await compare(userPassword, this.password);
};


export const usershema = model('users',user );