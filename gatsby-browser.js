/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it
import "./src/styles/global.css"
import React from "react"
import { CartCtxProvider } from "./src/ctx/CartCtx"

export const wrapRootElement = ({ element }) => (
  <CartCtxProvider>{element}</CartCtxProvider>
)
