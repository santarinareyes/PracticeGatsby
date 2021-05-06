const free_shipping = process.env.free_shipping || 15000;
const shipping_rate = process.env.shipping_rate || 500;

const productsTotal = (cart) => {
  const total = cart.reduce((counter, product) => {
    return counter + product.quantity * product.price;
  }, 0);

  return total;
};

const shippingCost = (cart) => {
  const cartCost = productsTotal(cart);
  return cartCost > free_shipping ? 0 : shipping_rate;
};

const totalCost = (cart) => {
  const cartCost = productsTotal(cart);
  const shipping = shippingCost(cart);
  const total = Math.round(cartCost + shipping);

  return total;
};

module.exports = {
  productsTotal,
  shippingCost,
  totalCost,
};
