import { Router, type IRouter } from "express";
import axios from "axios";

const router: IRouter = Router();

const prompts: Record<string, string> = {
  blog: "Write a detailed blog post:",
  social: "Write a viral social media post with hashtags:",
  product: "Write a persuasive product description:",
};

router.post("/", async (req, res) => {
  const { type, prompt } = req.body;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: prompts[type] || "Help the user:" },
          { role: "user", content: prompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data.choices[0].message.content);
  } catch (err: any) {
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

export default router;
