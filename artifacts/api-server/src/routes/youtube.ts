import { Router, type IRouter } from "express";
import axios from "axios";

const router: IRouter = Router();

const CLIENT_ID = process.env.YOUTUBE_CLIENT_ID;
const CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET;
const REDIRECT = process.env.YOUTUBE_REDIRECT;

router.get("/auth", (_req, res) => {
  const params = new URLSearchParams({
    client_id: CLIENT_ID as string,
    redirect_uri: REDIRECT as string,
    response_type: "code",
    scope: "https://www.googleapis.com/auth/youtube.upload",
    access_type: "offline",
    prompt: "consent",
  });
  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
});

router.get("/callback", async (req, res) => {
  const code = req.query.code as string;

  if (!code) {
    res.status(400).json({ error: "No code returned from Google" });
    return;
  }

  try {
    const tokenRes = await axios.post(
      "https://oauth2.googleapis.com/token",
      new URLSearchParams({
        code,
        client_id: CLIENT_ID as string,
        client_secret: CLIENT_SECRET as string,
        redirect_uri: REDIRECT as string,
        grant_type: "authorization_code",
      }).toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    res.json({
      message: "YouTube connected successfully",
      access_token: tokenRes.data.access_token,
      refresh_token: tokenRes.data.refresh_token || null,
      expires_in: tokenRes.data.expires_in,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

router.post("/upload", (_req, res) => {
  res.json({ message: "YouTube upload placeholder" });
});

export default router;
