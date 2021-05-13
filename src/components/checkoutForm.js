import React, { useEffect, useState, useContext } from "react"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { formatPrice } from "../utils/currency"

import CartCtx from "../ctx/CartCtx"
import Custom from "./Custom.css"

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()

  const { cart } = useContext(CartCtx)
  console.log("CheckoutForm, Cart", cart)

  const [token, setToken] = useState(false)
  const [total, setTotal] = useState("loading")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    await stripe.confirmCardPayment(token, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    })
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    const loadToken = async () => {
      const response = await fetch("http://localhost:1337/orders/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: cart.map(res => ({
            ...res,
            ...{ id: res.strapiId, quantity: res.quantInCart },
          })),
        }),
      })

      const data = await response.json()
      console.log("DATA", data)
      setToken(data.client_secret)
      setTotal(data.amount)
      setLoading(false)
    }
    loadToken()
  }, [cart])

  const [shipping, setShipping] = useState({})
  const handleChange = ({ target }) => {
    const { name, value } = target
    setShipping({ ...shipping, [name]: value })
    console.log(shipping)
  }

  return token ? (
    <div className="w-full mx-auto mb-10 shadow-md lg:w-1/2">
      <div className="px-10 py-10 bg-white">
        <form onSubmit={handleSubmit}>
          <input
            id="fullname"
            name="fullname"
            className="w-full px-3 py-2 mb-2 text-gray-800 border rounded appearance-none "
            placeholder="Fullname"
            onChange={handleChange}
          />
          <input
            id="address"
            name="address"
            className="w-full px-3 py-2 mb-2 text-gray-800 border rounded appearance-none "
            placeholder="Address"
            onChange={handleChange}
          />
          <input
            id="country"
            name="country"
            className="w-full px-3 py-2 mb-2 text-gray-800 border rounded appearance-none "
            placeholder="Country"
            onChange={handleChange}
          />
          <div className="flex">
            <input
              id="city"
              name="city"
              className="w-full px-3 py-2 mb-2 mr-1 text-gray-800 border rounded appearance-none "
              placeholder="City"
              onChange={handleChange}
            />
            <input
              id="zip"
              name="zip"
              type="number"
              style={Custom}
              className="w-full px-3 py-2 mb-2 ml-1 text-gray-800 border rounded appearance-none"
              placeholder="Zip"
              onChange={handleChange}
            />
          </div>
          <CardElement className="w-full px-3 py-3 mb-2 text-gray-800 border rounded appearance-none" />
          <button
            className={`w-full py-3 mt-2 text-sm font-semibold text-white uppercase ${
              !loading
                ? "bg-gray-600 hover:bg-gray-800"
                : "bg-white hover:bg-white"
            } `}
          >
            {!loading ? (
              <span>Confirm order</span>
            ) : (
              <span>
                <svg
                  className="h-5 mx-auto"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="24px"
                  height="30px"
                  viewBox="0 0 24 30"
                >
                  <rect
                    x="0"
                    y="10"
                    width="4"
                    height="10"
                    fill="#333"
                    opacity="0.2"
                  >
                    <animate
                      attributeName="opacity"
                      attributeType="XML"
                      values="0.2; 1; .2"
                      begin="0s"
                      dur="0.6s"
                      repeatCount="indefinite"
                    ></animate>
                    <animate
                      attributeName="height"
                      attributeType="XML"
                      values="10; 20; 10"
                      begin="0s"
                      dur="0.6s"
                      repeatCount="indefinite"
                    ></animate>
                    <animate
                      attributeName="y"
                      attributeType="XML"
                      values="10; 5; 10"
                      begin="0s"
                      dur="0.6s"
                      repeatCount="indefinite"
                    ></animate>
                  </rect>
                  <rect
                    x="8"
                    y="10"
                    width="4"
                    height="10"
                    fill="#333"
                    opacity="0.2"
                  >
                    <animate
                      attributeName="opacity"
                      attributeType="XML"
                      values="0.2; 1; .2"
                      begin="0.15s"
                      dur="0.6s"
                      repeatCount="indefinite"
                    ></animate>
                    <animate
                      attributeName="height"
                      attributeType="XML"
                      values="10; 20; 10"
                      begin="0.15s"
                      dur="0.6s"
                      repeatCount="indefinite"
                    ></animate>
                    <animate
                      attributeName="y"
                      attributeType="XML"
                      values="10; 5; 10"
                      begin="0.15s"
                      dur="0.6s"
                      repeatCount="indefinite"
                    ></animate>
                  </rect>
                  <rect
                    x="16"
                    y="10"
                    width="4"
                    height="10"
                    fill="#333"
                    opacity="0.2"
                  >
                    <animate
                      attributeName="opacity"
                      attributeType="XML"
                      values="0.2; 1; .2"
                      begin="0.3s"
                      dur="0.6s"
                      repeatCount="indefinite"
                    ></animate>
                    <animate
                      attributeName="height"
                      attributeType="XML"
                      values="10; 20; 10"
                      begin="0.3s"
                      dur="0.6s"
                      repeatCount="indefinite"
                    ></animate>
                    <animate
                      attributeName="y"
                      attributeType="XML"
                      values="10; 5; 10"
                      begin="0.3s"
                      dur="0.6s"
                      repeatCount="indefinite"
                    ></animate>
                  </rect>
                </svg>
              </span>
            )}
          </button>
        </form>
        <p className="mb-0 text-right">Total: {formatPrice(total)}</p>
      </div>
    </div>
  ) : (
    <svg
      className="mx-auto"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="24px"
      height="30px"
      viewBox="0 0 24 30"
    >
      <rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2">
        <animate
          attributeName="opacity"
          attributeType="XML"
          values="0.2; 1; .2"
          begin="0s"
          dur="0.6s"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="height"
          attributeType="XML"
          values="10; 20; 10"
          begin="0s"
          dur="0.6s"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="y"
          attributeType="XML"
          values="10; 5; 10"
          begin="0s"
          dur="0.6s"
          repeatCount="indefinite"
        ></animate>
      </rect>
      <rect x="8" y="10" width="4" height="10" fill="#333" opacity="0.2">
        <animate
          attributeName="opacity"
          attributeType="XML"
          values="0.2; 1; .2"
          begin="0.15s"
          dur="0.6s"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="height"
          attributeType="XML"
          values="10; 20; 10"
          begin="0.15s"
          dur="0.6s"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="y"
          attributeType="XML"
          values="10; 5; 10"
          begin="0.15s"
          dur="0.6s"
          repeatCount="indefinite"
        ></animate>
      </rect>
      <rect x="16" y="10" width="4" height="10" fill="#333" opacity="0.2">
        <animate
          attributeName="opacity"
          attributeType="XML"
          values="0.2; 1; .2"
          begin="0.3s"
          dur="0.6s"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="height"
          attributeType="XML"
          values="10; 20; 10"
          begin="0.3s"
          dur="0.6s"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="y"
          attributeType="XML"
          values="10; 5; 10"
          begin="0.3s"
          dur="0.6s"
          repeatCount="indefinite"
        ></animate>
      </rect>
    </svg>
  )
}

export default CheckoutForm
