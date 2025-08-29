import jwt from 'jsonwebtoken';
import user from '../models/user.js';

export const verifyToken = (token) => {
  if (!token) return Promise.reject(new Error("No token provided"));

  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) return reject(new Error("Invalid token"));

      try {
        const foundUser = await user.findById(decoded._id).select("-password");
        if (!foundUser) return reject(new Error("User not found"));
        resolve(foundUser);
      } catch (err) {
        reject(new Error(err));
      }
    });
  });
};

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = decoded;
    next();
  });
};
