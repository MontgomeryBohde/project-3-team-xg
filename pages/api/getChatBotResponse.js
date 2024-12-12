import OpenAI from "openai";
import { query } from '@lib/db';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Handler function for processing chatbot responses.
 * @param {import('next').NextApiRequest} req - The API request object.
 * @param {import('next').NextApiResponse} res - The API response object.
 * @returns {Promise<void>}
 */
export default async function handler(req, res) {
    /**
     * Query to fetch menu items from the database.
     * @type {Array<Object>}
     */
    const menuItems = await query(`
        SELECT 
        mi.id AS menu_item_id,
        mi.item_name AS menu_item_name,
        mi.category AS menu_item_category,
        sz.item_size,
        sz.price,
        sz.calories,
        mi.is_seasonal,
        EXISTS (
            SELECT 1 
            FROM unnest(mi.inventory_item_ids) AS inv_id
            JOIN inventory_items ii ON ii.id = inv_id
            WHERE ii.is_allergen
        ) AS has_allergen,
        NOT EXISTS (
            SELECT 1
            FROM unnest(mi.inventory_item_ids) AS inv_id
            JOIN inventory_items ii ON ii.id = inv_id
            WHERE NOT ii.is_vegan
        ) AS is_vegan
        FROM 
        menu_items mi
        JOIN 
        item_sizes sz ON mi.id = sz.item_id;
    `);

    /**
     * System prompt for the OpenAI API.
     * @type {string}
     */
    const systemPrompt = `
        You are Pandy, the Panda Express AI Assistant. Your role is to enhance the customer experience and
        answer questions about the menu. You can provide information about menu items, including their names, 
        sizes, prices, calories, if they are seasonal items, if they contain allergens, and if they are vegan:

        ${JSON.stringify(menuItems)}

        The restaurant is located at 300 Polo Rd, College Station, TX, 77840, which is located on the Texas A&M 
        University Campus. The restaurant is open from 10:30 AM to 9:00 PM Monday through Friday, and 10:30 AM
        to 8:00 PM on Saturday and Sunday. The restaurant phone number is (979) 773-8811. 

        You are NOT responsible for taking orders or processing payments. You are only responsible for providing
        information about the menu and the restaurant. If customers ask questions or make comments unrelated to
        the menu or the restaurant, you should respond with a message like "I'm sorry, I can only provide
        information about the menu and the restaurant. Is there anything else I can help you with?" 

        KEEP YOUR RESPONSES BRIEF. Use at most 2 sentences to respond to a customer's message.
    `;

    const messages = [
        {
            role: 'system',
            content: systemPrompt,
        },
        ...req.body.messages.filter(message => message.content !== null && message.content !== undefined),
    ];

    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
    });

    console.log(completion);
    console.log(completion.choices[0].message);

    const assistantMessage = completion.choices[0].message.content;

    res.status(200).json({ response: assistantMessage });
}