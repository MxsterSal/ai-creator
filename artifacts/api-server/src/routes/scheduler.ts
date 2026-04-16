import { Router, type IRouter } from "express";

const router: IRouter = Router();

interface ScheduledPost {
  userId: string;
  platform: string;
  time: string;
  content: string;
}

const scheduledPosts: ScheduledPost[] = [];

router.post("/schedule", (req, res) => {
  const { userId, platform, time, content } = req.body;
  scheduledPosts.push({ userId, platform, time, content });
  res.json({ message: "Scheduled successfully" });
});

router.get("/all", (_req, res) => {
  res.json(scheduledPosts);
});

export default router;
