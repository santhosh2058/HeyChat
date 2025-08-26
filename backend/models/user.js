import mongoose from 'mongoose';
import { hashPassword } from '../utils/hashPassword.js';


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  pic: { type: String, default: "https://res.cloudinary.com/santhosh2058/image/upload/v1755093936/Mern-Chat-App/cwmtjb137390zwvelq5j.jpg" }
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
