const express = require('express');
const router = express.Router();
const stripe=require("stripe")("sk_test_51MgCSrSIGmj3KYA8Erks6FwbQJZmn6umqAgauiIYgRCm3j1JEpAsQt7NnvyhCN2YfkSYoR37lVCL8EExfkHNCyZi00LFCpAGgL")
const User = require('../models/user'); // Import the User model


router.post('/payment', async (req, res) => {
    try {
        const product  = req.body; // Assuming you have a single product.
        console.log(product)
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
            success_url: 'http://localhost:3000/mycourses',
            cancel_url: 'http://localhost:3000/cancel',
        });
        

        const user=await User.findById(product.userId)
        if (user) {
            user.coursesBought.push(product.products[0]._id); // Add the newly purchased course to the user's coursesBought array
            await user.save(); // Save the user with the updated coursesBought array
           
          } else {
            return res.status(404).json({ error: 'User not found' });
          }
        
        res.status(200).json({ id: session.id });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Could not buy course' });
    }
});

module.exports = router;
