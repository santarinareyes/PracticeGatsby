import { formatPrice } from "../utils/currency"
export const free_shipping = process.env.free_shipping || 15000
export const shipping_rate = process.env.shipping_rate || 500

export const setCart = cart => {
  localStorage.setItem("cart", JSON.stringify(cart))
}

export const getCart = () => {
  try {
    const cart = JSON.parse(localStorage.getItem("cart"))
    if (cart) {
      return cart
    }
  } catch (err) {}
  return []
}

export const addToCart = (product, qty = 1, deleteAll = false) => {
  const cart = getCart()

  const indexOfProduct = cart.findIndex(
    alreadyInCart => alreadyInCart.strapiId === product.strapiId
  )

  if (indexOfProduct !== -1) {
    cart[indexOfProduct].quantInCart += parseInt(qty)

    if (cart[indexOfProduct].quantInCart === 0 || deleteAll) {
      cart.splice(indexOfProduct, 1)
    }
  } else {
    product.quantInCart = parseInt(qty)
    cart.push(product)
  }

  setCart(cart)
}

export const countItems = () => {
  const cart = getCart()

  const count = cart.reduce((counter, product) => {
    return counter + product.quantInCart
  }, 0)

  // let count = 0
  // cart.map(product => {
  //   count += product.quantInCart
  // })

  return count
}

export const productsTotal = () => {
  const cart = getCart()

  const cost = cart.reduce((counter, product) => {
    return counter + product.quantInCart * product.price
  }, 0)

  // let cost = 0
  // cart.map(product => {
  //   cost += product.quantInCart * product.price
  // })

  return cost
}

export const shippingCost = () => {
  const cartCost = productsTotal()
  return cartCost >= free_shipping ? 0 : shipping_rate
}

export const totalCost = () => {
  const cartCost = productsTotal()
  const shipping = shippingCost()

  return formatPrice(cartCost + shipping)
}

export const untillFreeShipping = () => {
  const cartCost = productsTotal()
  return free_shipping - cartCost
}
