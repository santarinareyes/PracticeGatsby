import * as React from "react"
import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import { countItems } from "../utils/cart"
import { getUser } from "../utils/showRegister"

const Header = ({ siteTitle }) => {
  const [, updateState] = React.useState()
  const forceUpdate = React.useCallback(() => updateState({}), [])

  return (
    <header className="fixed z-50 w-full px-8 text-gray-700 bg-white shadow-md body-font">
      <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
        <Link
          to="/"
          className="relative z-10 flex items-center w-auto text-2xl font-extrabold leading-none text-black select-none"
        >
          {siteTitle}
        </Link>

        <nav className="top-0 left-0 z-0 flex items-center justify-center w-full h-full py-5 -ml-0 space-x-5 text-base md:-ml-5 md:py-0 md:absolute">
          <Link
            to="/"
            className="relative font-medium leading-6 text-gray-600 transition duration-150 ease-out hover:text-gray-900"
          >
            <span>Products</span>
          </Link>
          <Link
            to="/"
            className="relative font-medium leading-6 text-gray-600 transition duration-150 ease-out hover:text-gray-900"
          >
            <span>About us</span>
          </Link>
        </nav>

        <div className="relative inline-flex items-center space-x-3 md:ml-5 lg:justify-end">
          {getUser().length === 0 && (
            <>
              <Link
                to="/login"
                className="py-2 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap transition duration-150 ease-out hover:text-gray-900"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="py-2 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap transition duration-150 ease-out hover:text-gray-900"
              >
                Register
              </Link>
            </>
          )}
          {getUser().length !== 0 && (
            <>
              <button
                onClick={() => {
                  localStorage.removeItem("jwt")
                  forceUpdate()
                }}
                className="py-2 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap transition duration-150 ease-out hover:text-gray-900"
              >
                Logout
              </button>
            </>
          )}
          <Link to="/cart" className="relative">
            <svg
              className="inline-flex w-6 h-6 my-2 text-gray-600 hover:text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {countItems() < 10 ? (
              <span className="absolute bottom-0 p-0 px-1 text-xs font-bold text-gray-600 bg-white border rounded-full -left-1">
                {countItems()}
              </span>
            ) : (
              <span className="absolute bottom-0 p-0 px-1 text-xs font-bold text-gray-600 bg-white border rounded-full -left-2">
                {countItems()}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
