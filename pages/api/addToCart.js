// pages/api/addToCart.js

/**
 * Handles the API requests for adding a meal to the cart.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {void}
 */
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
