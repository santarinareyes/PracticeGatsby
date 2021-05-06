// const formatPrice = priceWithDecimals => {
//   const price = parseInt(priceWithDecimals) / 100
//   return price.toLocaleString("en-SE", {
//     style: "currency",
//     currency: "SEK",
//   })
// }

export const formatPrice = (priceWithDecimals, quant = 1) => {
  const price = parseInt(priceWithDecimals * quant) / 100
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })
}
