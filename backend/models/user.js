import mongoose from 'mongoose';
import { hashPassword } from '../utils/hashPassword.js';


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  pic: { type: String, default: "https://res.cloudinary.com/dkvvk9d0f/image/upload/v1754958609/default_profile_pic_tloy4b.jpg" }
},{
  timestamps: true,
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const hashedPassword = await hashPassword(this.password);
  this.password = hashedPassword;
});


export default mongoose.model('User', userSchema);
