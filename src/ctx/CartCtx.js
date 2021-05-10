import React, { createContext, useState } from "react"

export const CartCtx = createContext(null)
console.log("ABC", CartCtx)

const CartCtxProvider = ({ children }) => {
  const [cart, setCart] = useState(children)

  return (
    <CartCtx.Provider value={{ cart, setCart }}>{children}</CartCtx.Provider>
  )
}

export default CartCtxProvider
