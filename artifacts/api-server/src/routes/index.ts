import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import authRouter from "./auth.js";
import generateRouter from "./generate.js";
import videoRouter from "./video.js";
import schedulerRouter from "./scheduler.js";
import stripeRouter from "./stripe-routes.js";
import adminRouter from "./admin.js";
import socialRouter from "./social.js";
import youtubeRouter from "./youtube.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/auth", authRouter);
router.use("/generate", generateRouter);
router.use("/video", videoRouter);
router.use("/scheduler", schedulerRouter);
router.use("/stripe", stripeRouter);
router.use("/admin", adminRouter);
router.use("/social", socialRouter);
router.use("/youtube", youtubeRouter);

export default router;
