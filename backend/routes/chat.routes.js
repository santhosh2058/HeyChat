import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { accessChat, addToGroup, createGroupChat, fetchChat, removeFromGroup, renameGroupChat } from '../controllers/chat.controllers.js';

const router = express.Router();

router.use('/', authenticate);
router.post('/', accessChat);
router.get('/', fetchChat);
router.post('/group', createGroupChat);
router.put('/group', renameGroupChat);
router.put('/groupAdd', addToGroup);
router.put('/groupRemove', removeFromGroup);

const chatRoutes = router;
export default chatRoutes;