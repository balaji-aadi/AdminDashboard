const express = require('express')
const router = express.Router();
const Order = require('../models/orderModel');
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization } = require('../verifyToken');


// CREATE ORDER

router.post("/", verifyToken , async (req, res) => {

    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder)
    }
    catch (err) {
        return res.status(500).json(err);
    }

})


// UPDATE ORDER

router.put('/:id', verifyTokenAndAdmin , async (req, res) => {

    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id,
            {
                $set: req.body
            },
            { new: true }
        );
        return res.status(200).json(updatedOrder);
    }
    catch (err) {
        return res.status(500).json(err);
    }
})


// DELETE ORDER

router.delete('/:id', verifyTokenAndAdmin, async (req,res) =>{
    try{
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("order has been deleted...")
    }
    catch(err){
        return res.status(500).json(err)
    }
})

// GET USER ORDERS

router.get("/find/:id", verifyTokenAndAuthorization , async (req,res) => {
    try{
       const orders =  await Order.find(req.params.id)

       res.status(200).json(orders);
    }
    catch(err){
        return res.status(500).json(err)
    }
})

// GET ALL ORDERS

router.get('/', verifyTokenAndAdmin, async (req,res) => {
    try{
        const orders = await Order.find();
        res.status(200).json(orders);
    }
    catch(err){
        return res.status(500).json(err);
    }
});


// GET MONTHLY INCOME

router.get('/income' , verifyTokenAndAdmin, async (req,res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1))



    try{
        const income = await Order.aggregate([
            {
                $match: {createdAt: {$gte:previousMonth}}
            },
            {
                $project: {
                    month : {$month : "$createdAt"},
                    sales : "$amount"
                },  
            },
            {
                $group:{
                    _id:"$month",
                    total : {$sum : "$sales" },
                }
            }
        ])
        res.status(200).json(income);
    }
    catch(err){
        return res.status(500).json(err)
    }
})





module.exports = router