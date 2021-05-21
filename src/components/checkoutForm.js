import React, { useEffect, useState, useContext } from "react"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import axios from "axios"
import Modal from "react-modal"

import { formatPrice } from "../utils/currency"

import CartCtx from "../ctx/CartCtx"
import "./Custom.css"

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
}

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const { cart, clearCart } = useContext(CartCtx)

  const [token, setToken] = useState(false)
  const [total, setTotal] = useState("loading")
  const [loading, setLoading] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false)
  // function openModal() {
  //   setIsOpen(true)
  // }

  function closeModal() {
    setIsOpen(false)
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
      // console.log("DATA", data)
      setToken(data.client_secret)
      setTotal(data.amount)
      setLoading(false)
    }
    loadToken()
  }, [cart])

  const [shipping, setShipping] = useState({
    shipping_name: "",
    phone: "",
    shipping_address: "",
    shipping_country: "",
    shipping_city: "",
    shipping_zip: "",
  })

  const handleChange = ({ target }) => {
    const { name, value } = target
    setShipping({ ...shipping, [name]: value })
    console.log(shipping)
  }

  const inputValidator = () => {
    if (
      shipping.shipping_name === "" ||
      shipping.phone === "" ||
      shipping.shipping_address === "" ||
      shipping.shipping_country === "" ||
      shipping.shipping_city === "" ||
      shipping.shipping_zip === ""
    ) {
      return true
    }

    return false
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const response = await stripe.confirmCardPayment(token, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    })
    setLoading(false)

    const orderData = {
      shipping_name: shipping.shipping_name,
      phone: shipping.phone,
      shipping_address: shipping.shipping_address,
      shipping_country: shipping.shipping_country,
      shipping_city: shipping.shipping_city,
      shipping_zip: shipping.shipping_zip,
      cart: cart,
      paymentIntent: response.paymentIntent,
    }

    const newOrder = async () => {
      await axios
        .post("http://localhost:1337/orders", orderData)
        .then(response => {
          clearCart()
          setIsOpen(true)
        })
        .catch(err => {
          console.log(err.response)
        })
    }
    newOrder()
  }

  return token ? (
    <div className="w-full mx-auto mb-10 shadow-md lg:w-1/2">
      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Order success"
      >
        <div className="text-center">
          <div className="relative">
            <h2 className="px-12">Order completed</h2>
            <span
              className="absolute px-2 text-white bg-gray-800 rounded cursor-pointer -right-4 -top-4"
              onClick={closeModal}
              onKeyDown={closeModal}
              role="presentation"
            >
              X
            </span>
            <p>Thank you for your purchase!</p>
          </div>
        </div>
      </Modal>
      {!modalIsOpen && (
        <div className="px-10 py-10 bg-white">
          <form onSubmit={handleSubmit}>
            <input
              id="fullname"
              name="shipping_name"
              value={shipping.shipping_name}
              className="w-full px-3 py-2 mb-2 text-gray-800 border rounded appearance-none "
              placeholder="Fullname"
              onChange={handleChange}
            />
            <input
              id="phone"
              name="phone"
              value={shipping.phone}
              type="number"
              className="w-full px-3 py-2 mb-2 text-gray-800 border rounded appearance-none "
              placeholder="Phone"
              onChange={handleChange}
            />
            <input
              id="address"
              name="shipping_address"
              value={shipping.shipping_address}
              className="w-full px-3 py-2 mb-2 text-gray-800 border rounded appearance-none "
              placeholder="Address"
              onChange={handleChange}
            />
            <input
              id="country"
              name="shipping_country"
              value={shipping.shipping_country}
              className="w-full px-3 py-2 mb-2 text-gray-800 border rounded appearance-none "
              placeholder="Country"
              onChange={handleChange}
            />
            <div className="flex">
              <input
                id="city"
                name="shipping_city"
                value={shipping.shipping_city}
                className="w-full px-3 py-2 mb-2 mr-1 text-gray-800 border rounded appearance-none "
                placeholder="City"
                onChange={handleChange}
              />
              <input
                id="zip"
                name="shipping_zip"
                value={shipping.shipping_zip}
                type="number"
                className="w-full px-3 py-2 mb-2 ml-1 text-gray-800 border rounded appearance-none"
                placeholder="Zip"
                onChange={handleChange}
              />
            </div>
            <CardElement className="w-full px-3 py-3 mb-2 text-gray-800 border rounded appearance-none" />
            <button
              disabled={inputValidator()}
              className={`${
                inputValidator() ? "cursor-not-allowed" : ""
              } disabled:opacity-50 disabled:bg-gray-800 w-full py-3 mt-2 text-sm font-semibold text-white uppercase ${
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
      )}
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
