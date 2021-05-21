import * as React from "react"
import { Link, navigate } from "gatsby"
import axios from "axios"

import Layout from "../components/layout"
import Seo from "../components/seo"

import { SetUser } from "../utils/showRegister"

const Login = () => {
  const [loginDetails, setLoginDetails] = React.useState({})
  const [err, setErr] = React.useState(false)

  const data = {
    identifier: loginDetails.email,
    email: loginDetails.email,
    username: loginDetails.email,
    password: loginDetails.password,
  }

  const handleChange = ({ target }) => {
    const { name, value } = target
    setLoginDetails({ ...loginDetails, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    await axios
      .post("http://localhost:1337/auth/local", data)
      .then(response => {
        SetUser(response.data.jwt)
        navigate("/", { state: { newUser: false, signedInUser: true } })
      })
      .catch(() => {
        setErr(true)
      })
  }

  return (
    <Layout>
      <Seo title="Login" />
      <div className="min-h-screen py-8 bg-gray-100 lg:py-8">
        <form
          onSubmit={handleSubmit}
          className="container py-20 mx-auto border-grey-lighter"
        >
          <div className="w-full mx-auto rounded shadow md:w-5/6 lg:w-1/2">
            <div className="px-8 py-4 text-xl text-black bg-white border-t border-b border-grey-lighter">
              Login
            </div>
            <div className="px-8 py-4 bg-white">
              <div className="flex mb-4"></div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-800"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className="w-full px-3 py-2 border rounded appearance-none text-grey-darker"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-grey-darker"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="w-full px-3 py-2 border rounded appearance-none text-grey-darker"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Your password"
                  onChange={handleChange}
                />
                {err && (
                  <p className="text-red-500">Email or password is incorrect</p>
                )}
              </div>
              <div className="flex flex-col items-end justify-between mt-8 sm:items-center sm:flex-row">
                <Link
                  to="/register"
                  className="mb-3 sm:mb-0 hover:text-gray-500"
                >
                  Don't have an account?
                </Link>
                <button
                  className="px-4 py-2 font-semibold text-gray-800 bg-transparent border border-gray-500 rounded hover:bg-gray-500 hover:text-white hover:border-transparent"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
          <p className="my-4 text-center"></p>
        </form>
      </div>
    </Layout>
  )
}

export default Login
