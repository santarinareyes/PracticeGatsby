import React from "react"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = e => {
    console.log(e)
  }

  return (
    <div className="mb-10 shadow-md">
      <div className="w-full px-10 py-10 bg-white">
        <div className="flex mt-10 mb-5">
          <form onSubmit={handleSubmit}>
            <CardElement />
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
  )
}

export default CheckoutForm
