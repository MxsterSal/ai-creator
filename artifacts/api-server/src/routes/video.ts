import { Router, type IRouter } from "express";

const router: IRouter = Router();

const usage: Record<string, number> = {};

router.post("/generate", (req, res) => {
  const { userId, length } = req.body;

  if (!usage[userId]) usage[userId] = 0;

  if (Number(length) === 60 && usage[userId] >= 10) {
    res.status(403).json({ error: "60-second monthly limit reached" });
    return;
  }

  if (Number(length) === 60) usage[userId]++;

  res.json({
    message: "Placeholder video generated",
    videoUrl: "https://example.com/video.mp4",
  });
});

export default router;
