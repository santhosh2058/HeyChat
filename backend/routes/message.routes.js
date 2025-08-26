import express from "express";

import { authenticate } from "../middleware/auth.middleware.js";
import { createMessage, fetchMessages } from "../controllers/message.controller.js";

const router = express.Router();

router.use(authenticate);

router.post("/", createMessage);
router.get("/:chatId", fetchMessages);

const messageRoutes = router;
export default messageRoutes;
