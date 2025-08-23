import express from 'express';
import user from '../models/user.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authenticate);

// api/user?search=santh
router.get('/', async (req, res) => {
  const searchQuery = req.query.search ? { $or: [
    { name: { $regex: req.query.search, $options: 'i' } },
    { email: { $regex: req.query.search, $options: 'i' } }
  ]} : {};

  const users = await user.find(searchQuery).find({ _id: {$ne: req.user._id} });
  console.log(users);
  res.json(users);
});

const userRoutes = router;
export default userRoutes;