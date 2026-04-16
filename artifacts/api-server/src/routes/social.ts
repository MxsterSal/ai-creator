import { Router, type IRouter } from "express";

const router: IRouter = Router();

router.post("/connect", (_req, res) => {
  res.json({ message: "Social OAuth connect placeholder" });
});

router.post("/post", (_req, res) => {
  res.json({ message: "Social auto-post placeholder" });
});

export default router;
