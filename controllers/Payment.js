import stripe from "stripe";
process.env.STRIPE_SECRET_KEY;

// Process payment
export const processPayment = async (req, res) => {
  const { amount, token } = req.body;
  try {
    const charge = await stripe.charges.create({
      amount,
      currency: "usd",
      source: token.id,
      description: "Real Estate Marketplace Payment",
    });
    res.json({ success: true, charge });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
