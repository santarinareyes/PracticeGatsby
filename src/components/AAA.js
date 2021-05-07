import * as React from "react"
import { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { topNav, languages, contactUs } from "../utils/languages"

import { capitalizeFirstLetter } from "../utils/stringHelper"

const Header = ({ siteTitle }) => {
  const [isExpanded, toggleExpansion] = useState(false)
  const [language, setLanguage] = useState("sv")

  return (
    <nav className="flex flex-wrap items-center justify-between p-6 border-b">
      <div className="flex items-center flex-shrink-0 mr-6 text-black">
        <Link to="/">
          <span className="text-xl font-semibold tracking-tight">
            {siteTitle}
            <span class="text-red-800">.</span>
          </span>
        </Link>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={() => toggleExpansion(!isExpanded)}
          className="flex items-center px-3 py-2 text-gray-600 border border-gray-600 rounded hover:text-gray-800 hover:border-gray-800"
        >
          <svg
            className="w-3 h-3 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={`${
          isExpanded ? `block` : `hidden`
        } w-full block flex-grow lg:flex lg:items-center lg:w-auto`}
      >
        <div className="mx-auto text-sm">
          {/* fixa så att sv kan ändras till ru från props */}
          {topNav[language].map(link => (
            <Link
              key={link.id}
              to={`/${link.text}`}
              href="#responsive-header"
              className="block mt-4 mr-4 text-gray-600 transition ease-in-out transform lg:inline-block lg:mt-0 hover:text-gray-800 lg:hover:-translate-y-1 lg:hover:scale-110 lg:border-none"
            >
              {capitalizeFirstLetter(link.text)}
            </Link>
          ))}
        </div>
        <div className="mt-2 border-t lg:border-none">
          <div className="text-center lg:inline-block">
            {languages.map(lang => (
              <>
                <button
                  key={lang.id}
                  className="inline-block px-1 mt-4 text-gray-600 transition ease-in-out transform border-l hover:text-gray-800 lg:hover:-translate-y-1 lg:hover:scale-110 lg:mt-0 first:border-0"
                  onClick={() => {
                    setLanguage(lang.text)
                  }}
                >
                  {lang.text.toUpperCase()}
                </button>
              </>
            ))}
          </div>
          <Link
            to="/kontakta-oss"
            className="block px-4 py-2 mt-4 text-sm leading-none text-center text-gray-600 border border-gray-600 rounded lg:ml-2 lg:inline-block hover:bg-gray-600 hover:text-white hover:border-gray-600 lg:mt-0"
          >
            {contactUs[language]}
          </Link>
        </div>
      </div>
    </nav>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
