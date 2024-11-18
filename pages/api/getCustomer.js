// pages/api/getCustomer.js
import { query } from '@lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { phoneNumber } = req.query;

    try {
      const sanitizedPhoneNumber = phoneNumber.replace(/[()-]/g, '');
      const customer = await query(
        'SELECT * FROM customers WHERE phone_number = $1',
        [sanitizedPhoneNumber]
      );
      res.status(200).json(customer[0] || {});
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch customer data' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
