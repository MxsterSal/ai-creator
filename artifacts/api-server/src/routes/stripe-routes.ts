import { Router, type IRouter } from "express";
import Stripe from "stripe";

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) throw new Error("STRIPE_SECRET_KEY must be set");
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

const router: IRouter = Router();

router.post("/create-checkout", async (req, res) => {
  try {
    const origin = req.headers.origin || `https://${req.headers.host}`;
    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Premium Plan" },
            unit_amount: 1200,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/dashboard`,
      cancel_url: `${origin}/dashboard`,
    });
    res.json({ url: session.url });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
