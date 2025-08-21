import jwt from 'jsonwebtoken';

export const generateToken = (_id, name, username, email,pic) => {
  console.log("Generating token for user:", { _id, name, username, email,pic});
  return jwt.sign({ _id, name, username, email,pic }, process.env.JWT_SECRET_KEY, {
    expiresIn: '7d',
  });
};

export default generateToken;
