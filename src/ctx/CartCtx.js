import React, { createContext, useState } from "react"

import { getCart, setCart } from "../utils/cart"

const CartCtx = createContext(getCart())

const CartCtxProvider = ({ children }) => {
  const [cart, setCartCtx] = useState(getCart())
  console.log("CARTCTX", cart)

  const updateCart = cart => {
    setCart(cart)
    setCartCtx(cart)
  }

  const addToCart = (product, qty = 1, deleteAll = false) => {
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

    updateCart(cart)
    console.log("cart", cart)
  }

  return (
    <CartCtx.Provider value={{ cart, addToCart }}>{children}</CartCtx.Provider>
  )
}

export default CartCtx
export { CartCtxProvider }
