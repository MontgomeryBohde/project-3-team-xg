// pages/api/getCart.js

let cart = [];

/**
 * Handles the API requests for retrieving the data thats in cart.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {void}
 */
export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ cart });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
