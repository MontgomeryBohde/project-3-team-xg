// pages/api/addToCart.js

export default function handler(req, res) {
    if (req.method === 'POST') {
      const { mealName } = req.body;
      res.status(200).json({ message: 'Meal added to cart' });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  