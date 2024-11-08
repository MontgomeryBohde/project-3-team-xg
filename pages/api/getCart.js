// pages/api/getCart.js

let cart = []; // The same in-memory cart array, used for temporary storage

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Return the current cart items
    res.status(200).json({ cart });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
