"use strict";
const stripe = require("stripe")(
  "sk_test_51Io0YXD6lU6s8HD0CDXWnmRbLESyPCrzL3GN1UPnJCx9sd7Q4sns8rPXRZkyknxPJ3JQhiWIGOVWAOTGVq6PEYJT00OeSSlKPS"
);
const { sanitizeEntity } = require("strapi-utils");

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
          id: product.strapiId,
        });

        // console.log("validated product: ", validatedProduct);

        if (validatedProduct) {
          validatedProduct.quantity = product.quantity;
          validatedCart.push(validatedProduct);
          cartReceipt.push({
            id: product.strapiId,
            quantity: product.quantity,
          });
        }

        return validatedProduct;
      })
    );

    // console.log("VALI-CART: ", validatedCart);
    total = strapi.config.functions.cartTotal.totalCost(validatedCart);
    // console.log("TOTAL: ", total);

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
        metadata: { cart: JSON.stringify(cartReceipt) },
      });

      // console.log("paymentIntent", paymentIntent);
      return paymentIntent;
    } catch (err) {
      return { error: err.raw.message };
    }
  },

  create: async (ctx) => {
    const {
      shipping_name,
      phone,
      shipping_address,
      shipping_country,
      shipping_city,
      shipping_zip,
      cart,
      paymentIntent,
    } = ctx.request.body;

    // Retrieve a PaymentIntent
    // https://stripe.com/docs/api/payment_intents/retrieve?lang=node
    const getPaymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntent.id
    );
    console.log("getPaymentIntent", getPaymentIntent);

    let products = [];
    let products_quant = [];
    let validatedCart = [];

    // Validate product
    await Promise.all(
      cart.map(async (product) => {
        const checkProduct = await strapi.services.product.findOne({
          id: product.strapiId,
        });

        if (checkProduct) {
          products_quant.push({
            id: product.strapiId,
            quantity: product.quantInCart,
          });

          products.push(checkProduct);

          validatedCart.push({
            ...checkProduct,
            ...{ quantity: product.quantInCart },
          });
        }
        // console.log("VALI", checkProduct);
        return checkProduct;
      })
    );

    let total_price =
      strapi.config.functions.cartTotal.totalCost(validatedCart);

    const entry = {
      shipping_name,
      phone,
      shipping_address,
      shipping_country,
      shipping_city,
      shipping_zip,

      products,
      products_quant,

      total_price,
    };

    const entity = await strapi.services.order.create(entry);
    return sanitizeEntity(entity, { model: strapi.models.order });
  },
};
