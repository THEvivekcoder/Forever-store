import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import Razorpay from "razorpay";
import crypto from "crypto";

// Global variables
const currency = "inr";
const deliveryCharge = 10;

// Stripe initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Razorpay initialize
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


// =====================================================
// PLACE ORDER - COD
// =====================================================

const placeOrder = async (req, res) => {
    try {

        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        };

        const newOrder = new orderModel(orderData);

        await newOrder.save();

        await userModel.findByIdAndUpdate(
            userId,
            {
                cartData: {}
            }
        );

        res.json({
            success: true,
            message: "Order Placed"
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: error.message
        });
    }
};


// =====================================================
// PLACE ORDER - STRIPE
// =====================================================

const placeOrderStripe = async (req, res) => {

    try {

        const { userId, items, amount, address } = req.body;

        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        };

        const newOrder = new orderModel(orderData);

        await newOrder.save();


        const line_items = items.map((item) => ({

            price_data: {

                currency: currency,

                product_data: {
                    name: item.name
                },

                unit_amount: item.price * 100
            },

            quantity: item.quantity
        }));


        // Delivery charge
        line_items.push({

            price_data: {

                currency: currency,

                product_data: {
                    name: "Delivery Charges"
                },

                unit_amount: deliveryCharge * 100
            },

            quantity: 1
        });


        const session = await stripe.checkout.sessions.create({

            success_url:
                `${origin}/verify?success=true&orderId=${newOrder._id}`,

            cancel_url:
                `${origin}/verify?success=false&orderId=${newOrder._id}`,

            line_items,

            mode: "payment"
        });


        res.json({
            success: true,
            session_url: session.url
        });


    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: error.message
        });
    }
};


// =====================================================
// VERIFY STRIPE PAYMENT
// =====================================================

const verifyStripe = async (req, res) => {

    const {
        orderId,
        success,
        userId
    } = req.body;

    try {

        if (success === "true") {

            await orderModel.findByIdAndUpdate(
                orderId,
                {
                    payment: true
                }
            );

            await userModel.findByIdAndUpdate(
                userId,
                {
                    cartData: {}
                }
            );

            res.json({
                success: true
            });

        } else {

            await orderModel.findByIdAndDelete(orderId);

            res.json({
                success: false
            });
        }

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: error.message
        });
    }
};


// =====================================================
// PLACE ORDER - RAZORPAY
// =====================================================

const placeOrderRazorpay = async (req, res) => {

    try {

        const {
            userId,
            items,
            amount,
            address
        } = req.body;


        // Save order in MongoDB
        const orderData = {

            userId,

            items,

            address,

            amount,

            paymentMethod: "Razorpay",

            payment: false,

            date: Date.now()
        };


        const newOrder = new orderModel(orderData);

        await newOrder.save();


        // Razorpay amount is in paise
        const options = {

            amount: Math.round(amount * 100),

            currency: currency.toUpperCase(),

            receipt: newOrder._id.toString()
        };


        console.log("Creating Razorpay order...");
        console.log("Amount:", options.amount);
        console.log("Currency:", options.currency);
        console.log("Receipt:", options.receipt);


        const order = await razorpayInstance.orders.create(options);


        console.log("RAZORPAY ORDER CREATED:");
        console.log(order);


        res.json({

            success: true,

            order
        });


    } catch (error) {

        console.log("RAZORPAY ORDER ERROR:");
        console.log(error);


        res.json({

            success: false,

            message: error.message
        });
    }
};


// =====================================================
// VERIFY RAZORPAY PAYMENT
// =====================================================

const verifyRazorpay = async (req, res) => {

    try {

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;


        console.log("=================================");
        console.log("RAZORPAY PAYMENT RESPONSE");
        console.log("=================================");

        console.log("Order ID:", razorpay_order_id);
        console.log("Payment ID:", razorpay_payment_id);
        console.log("Signature:", razorpay_signature);


        // Make sure all values exist
        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature
        ) {

            return res.json({

                success: false,

                message: "Incomplete Razorpay payment response"
            });
        }


        // =================================================
        // GENERATE SIGNATURE
        // =================================================

        const generatedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(
                razorpay_order_id +
                "|" +
                razorpay_payment_id
            )
            .digest("hex");


        console.log("Generated Signature:", generatedSignature);

        console.log(
            "Received Signature:",
            razorpay_signature
        );


        // =================================================
        // VERIFY SIGNATURE
        // =================================================

        if (generatedSignature !== razorpay_signature) {

            console.log("❌ SIGNATURE VERIFICATION FAILED");

            return res.json({

                success: false,

                message: "Payment verification failed"
            });
        }


        console.log("✅ SIGNATURE VERIFIED");


        // =================================================
        // FETCH RAZORPAY ORDER
        // =================================================

        const orderInfo =
            await razorpayInstance.orders.fetch(
                razorpay_order_id
            );


        console.log(
            "Razorpay Order Status:",
            orderInfo.status
        );


        // =================================================
        // CHECK PAYMENT STATUS
        // =================================================

        if (orderInfo.status === "paid") {


            // Update MongoDB order
            await orderModel.findByIdAndUpdate(

                orderInfo.receipt,

                {
                    payment: true
                }
            );


            // Find order
            const order =
                await orderModel.findById(
                    orderInfo.receipt
                );


            // Clear user's cart
            if (order) {

                await userModel.findByIdAndUpdate(

                    order.userId,

                    {
                        cartData: {}
                    }
                );
            }


            console.log("✅ PAYMENT SUCCESSFUL");


            return res.json({

                success: true,

                message: "Payment Successful"
            });


        } else {

            console.log(
                "❌ PAYMENT NOT CAPTURED"
            );


            return res.json({

                success: false,

                message: "Payment not captured"
            });
        }


    } catch (error) {

        console.log(
            "RAZORPAY VERIFICATION ERROR:"
        );

        console.log(error);


        res.json({

            success: false,

            message: error.message
        });
    }
};


// =====================================================
// ALL ORDERS - ADMIN
// =====================================================

const allOrders = async (req, res) => {

    try {

        const orders =
            await orderModel.find({});

        res.json({

            success: true,

            orders
        });

    } catch (error) {

        console.log(error);

        res.json({

            success: false,

            message: error.message
        });
    }
};


// =====================================================
// USER ORDERS
// =====================================================

const userOrders = async (req, res) => {

    try {

        const { userId } = req.body;


        const orders =
            await orderModel.find({
                userId
            });


        res.json({

            success: true,

            orders
        });

    } catch (error) {

        console.log(error);

        res.json({

            success: false,

            message: error.message
        });
    }
};


// =====================================================
// UPDATE ORDER STATUS - ADMIN
// =====================================================

const updateStatus = async (req, res) => {

    try {

        const {
            orderId,
            status
        } = req.body;


        await orderModel.findByIdAndUpdate(

            orderId,

            {
                status
            }
        );


        res.json({

            success: true,

            message: "Status Updated"
        });


    } catch (error) {

        console.log(error);

        res.json({

            success: false,

            message: error.message
        });
    }
};


// =====================================================
// EXPORT
// =====================================================

export {
    verifyRazorpay,
    verifyStripe,
    placeOrder,
    placeOrderStripe,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updateStatus
};