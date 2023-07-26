const express = require('express')
const router = express.Router();
const stripe = require("stripe")('sk_test_51NVZnMSDNiAhnWgLtWCVRDS4ERKLx9ttdTLSmZmnOa0oEQPqTm9FiGrT452ESkpVz0OgD2tVbFHDJ3Eg16f74txZ00rLzPCRSk');



router.post('/payment', (req,res) =>{
    stripe.charges.create(
    {
        source:req.body.tokenId,
        amount : req.body.amount,
        currency : "in"
        
    }, (stripeErr, stripeRes) => {
        if(stripeErr){
            return res.status(500).json(stripeErr)
        }
        else{
            res.status(200).json(stripeRes)
        }
    })
})



// router.post("/payment", async (req,res) => {
//     try{
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types : ["card"],
//             mode : "payment",
//             line_items : req.body.items.map(item => {
//                 return {
//                     price
//                 }
//             })
//         })
//     }
//     catch(err){
//         res.status(500).json(err)
//     }
// })

module.exports = router