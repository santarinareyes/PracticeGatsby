"use strict";
const stripe = require("stripe")(
  "sk_test_51Io0YXD6lU6s8HD0CDXWnmRbLESyPCrzL3GN1UPnJCx9sd7Q4sns8rPXRZkyknxPJ3JQhiWIGOVWAOTGVq6PEYJT00OeSSlKPS"
);

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  stripeSetup: async (ctx) => {
    let total = 1000;
    let validatedCart = [];
    let cartReceipt = [];

    const { cart } = ctx.request.body;

    await Promise.all(
      cart.map(async (product) => {
        const validatedProduct = await strapi.services.product.findOne({
          id: product.id,
        });

        console.log("validated product: ", validatedProduct);

        if (validatedProduct) {
          validatedProduct.quantity = product.quantity;
          validatedCart.push(validatedProduct);
          cartReceipt.push({
            id: product.id,
            quantity: product.quantity,
          });
        }

        return validatedProduct;
      })
    );

    console.log("VALI-CART: ", validatedCart);
    total = strapi.config.functions.cartTotal.totalCost(validatedCart);
    console.log("TOTAL: ", total);

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
        metadata: { cart: JSON.stringify(cartReceipt) },
      });

      return paymentIntent;
    } catch (err) {
      return { error: err.raw.message };
    }
  },
};
