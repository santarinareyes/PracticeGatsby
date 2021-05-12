import React from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

import CheckoutForm from "./checkoutForm.js"

const stripe = loadStripe(
  "pk_test_51Io0YXD6lU6s8HD0tIwNHDBt1BZ7x3eMIhl3uWtLkktUgmXaUQjCHmMLYNkQAjPJOcJ19luoA6DGH7Lceb9p2E4v00TUSj0GAR"
)

const Checkout = () => {
  return (
    <Elements stripe={stripe}>
      <CheckoutForm />
    </Elements>
  )
}

export default Checkout
