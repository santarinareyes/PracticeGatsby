/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          company
        }
      }
    }
  `)

  let [clicked, setClicked] = React.useState(0)
  const handleClick = () => {
    setClicked((clicked += 1))
  }

  return (
    <>
      <Header
        clicked={clicked}
        siteTitle={data.site.siteMetadata?.title || `Title`}
      />
      <div>
        <main
          role="presentation"
          onClick={handleClick}
          onKeyDown={handleClick}
          className="pt-18"
        >
          {children}
        </main>
        <Footer company={data.site.siteMetadata?.company || `Company`} />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
