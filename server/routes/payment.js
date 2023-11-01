const express = require('express');
const router = express.Router();
const stripe=require("stripe")("sk_test_51MgCSrSIGmj3KYA8Erks6FwbQJZmn6umqAgauiIYgRCm3j1JEpAsQt7NnvyhCN2YfkSYoR37lVCL8EExfkHNCyZi00LFCpAGgL")


router.post('/payment', async (req, res) => {
    try {
        const product  = req.body; // Assuming you have a single product.
        
        const lineItem = {
            price_data: {
                currency: 'inr',
                product_data: {
                    name: `${product.products[0].name}`,
                },
                unit_amount: product.products[0].price * 100,
            },
            quantity: 1, // You may want to adjust the quantity as needed.
        };

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [lineItem], // Use an array with a single line item.
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        });
        
        res.status(200).json({ id: session.id });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Could not buy course' });
    }
});

module.exports = router;
