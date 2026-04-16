import { Router, type IRouter } from "express";
import getSupabase from "../config/supabase.js";

const router: IRouter = Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await getSupabase().auth.signUp({ email, password });
  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }
  res.json(data);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await getSupabase().auth.signInWithPassword({ email, password });
  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }
  res.json(data);
});

export default router;
