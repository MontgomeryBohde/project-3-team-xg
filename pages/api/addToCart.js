// pages/api/addToCart.js

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { mealName } = req.body;
    // Assume mealName is saved in memory or processed elsewhere
    res.status(200).json({ message: 'Meal added to cart' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
