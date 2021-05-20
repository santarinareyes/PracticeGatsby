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

  let [test, setTest] = React.useState(0)

  return (
    <>
      <Header
        test={test}
        siteTitle={data.site.siteMetadata?.title || `Title`}
      />
      <div>
        <main
          onClick={() => {
            setTest((test += 1))
            console.log(test)
          }}
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
