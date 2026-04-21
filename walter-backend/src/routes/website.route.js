import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
import {
  createWebsiteChat,
  deleteWebsiteChat,
  getWebsiteChats,
  updateWebsiteChat,
} from "../controllers/website.controller.js";

const router = express.Router();

router.use(arcjetProtection, protectRoute);

router.get("/", getWebsiteChats);
router.post("/", createWebsiteChat);
router.put("/:id", updateWebsiteChat);
router.delete("/:id", deleteWebsiteChat);

export default router;
