import React, { useEffect, useState } from "react"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()

  const [token, setToken] = useState(true)

  const handleSubmit = e => {
    console.log(e)
  }

  useEffect(() => {
    const loadToken = async () => {
      const response = await fetch("http://localhost:1337/orders/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: [
            { id: 1, quantity: 2 },
            { id: 2, quantity: 1 },
          ],
        }),
      })

      const data = await response.json()
      console.log("DATA", data)
    }
    loadToken()
  }, [])

  return token ? (
    <div className="mb-10 shadow-md">
      <div className="w-full px-10 py-10 bg-white">
        <CardElement />
        <div className="flex mt-10 mb-5">
          <form onSubmit={handleSubmit}>
            {/* <h3 className="w-2/5 text-xs font-semibold text-gray-600 uppercase">
              Product Details
            </h3>
            <h3 className="w-1/5 text-xs font-semibold text-center text-gray-600 uppercase">
              Quantity
            </h3>
            <h3 className="w-1/5 text-xs font-semibold text-center text-gray-600 uppercase">
              Price
            </h3>
            <h3 className="w-1/5 text-xs font-semibold text-center text-gray-600 uppercase">
              Total
            </h3> */}
          </form>
        </div>
      </div>
    </div>
  ) : (
    <p>Loading</p>
  )
}

export default CheckoutForm
