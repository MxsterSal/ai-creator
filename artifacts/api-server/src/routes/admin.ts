import { Router, type IRouter } from "express";

const router: IRouter = Router();

const stats = {
  users: 0,
  premium: 0,
  revenue: 0,
  videos: 0,
};

router.get("/stats", (_req, res) => {
  res.json(stats);
});

export default router;
