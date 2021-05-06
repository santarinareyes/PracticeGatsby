import React, { useState } from "react"
import { Link, navigate } from "gatsby"
import axios from "axios"

import Layout from "../components/layout"
import Seo from "../components/seo"

import { setUser } from "../utils/showRegister"

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm_password: "",
  })

  const handleChange = ({ target }) => {
    const { name, value } = target
    setUserInfo({
      ...userInfo,
      [name]: value,
    })
  }

  const [firstnameErr, setFirstnameErr] = useState(false)
  const [lastnameErr, setLastnameErr] = useState(false)
  const [passwordErr, setPasswordErr] = useState(true)
  const [confPasswordErr, setConfPasswordErr] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()

    userInfo.firstname.length < 2 || userInfo.firstname.length > 20
      ? setFirstnameErr(true)
      : setFirstnameErr(false)

    userInfo.lastname.length < 2 || userInfo.lastname.length > 20
      ? setLastnameErr(true)
      : setLastnameErr(false)

    userInfo.password.length < 6 ? setPasswordErr(true) : setPasswordErr(false)

    userInfo.password !== userInfo.confirm_password ||
    userInfo.confirm_password.length < 6
      ? setConfPasswordErr(true)
      : setConfPasswordErr(false)

    const data = {
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      username: userInfo.email,
      email: userInfo.email,
      password: userInfo.password,
    }

    if (!firstnameErr && !lastnameErr && !passwordErr && !confPasswordErr) {
      await axios
        .post("http://localhost:1337/auth/local/register", data)
        .then(response => {
          setUser(response.data.jwt)
          navigate("/", { state: { newUser: true } })
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  }

  return (
    <Layout>
      <Seo title="Cart" />
      <div className="min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="container py-20 mx-auto border-grey-lighter"
        >
          <div className="w-5/6 mx-auto rounded shadow lg:w-1/2">
            <div className="px-8 py-4 text-xl text-black bg-white border-t border-b border-grey-lighter">
              Register
            </div>
            <div className="px-8 py-4 bg-white">
              <div className="flex mb-4">
                <div className="w-1/2 mr-1">
                  <label
                    className="block mb-2 text-sm font-bold text-grey-darker"
                    htmlFor="firstname"
                  >
                    Firstname
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded appearance-none text-grey-darker"
                    id="firstname"
                    type="text"
                    name="firstname"
                    placeholder="Your first name"
                    onChange={handleChange}
                    value={userInfo.firstname}
                  />
                  {firstnameErr && (
                    <p className="mt-1 mb-0 text-xs text-red-500">
                      At least 2 and max 20 characters
                    </p>
                  )}
                </div>
                <div className="w-1/2 ml-1">
                  <label
                    className="block mb-2 text-sm font-bold text-grey-darker"
                    htmlFor="lastname"
                  >
                    Lastname
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded appearance-none text-grey-darker"
                    id="lastname"
                    type="text"
                    name="lastname"
                    placeholder="Your last name"
                    onChange={handleChange}
                    value={userInfo.lastname}
                  />
                  {lastnameErr && (
                    <p className="mt-1 mb-0 text-xs text-red-500">
                      At least 2 and max 20 characters
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-grey-darker"
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
                  value={userInfo.email}
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
                  value={userInfo.password}
                />
                {passwordErr && (
                  <p className="mt-1 text-xs text-grey">
                    At least 6 characters
                  </p>
                )}
                {/* {!passwordErr && (
                  <p className="mt-1 text-xs text-red-500">
                    At least 6 characters
                  </p>
                )} */}
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-grey-darker"
                  htmlFor="confirm_password"
                >
                  Confirm Password
                </label>
                <input
                  className="w-full px-3 py-2 border rounded appearance-none text-grey-darker"
                  id="confirm_password"
                  type="password"
                  name="confirm_password"
                  placeholder="Confirm your password"
                  onChange={handleChange}
                />
                {confPasswordErr && (
                  <p className="mb-0 text-xs text-red-500">
                    Password does not match
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between mt-8">
                <button
                  className="px-4 py-2 font-semibold text-gray-800 bg-transparent border border-gray-500 rounded hover:bg-gray-500 hover:text-white hover:border-transparent"
                  type="submit"
                >
                  Sign Up
                </button>
                <Link to="/login" className="hover:text-gray-500">
                  Already have an account?
                </Link>
              </div>
            </div>
          </div>
          <p className="my-4 text-center"></p>
        </form>
      </div>
    </Layout>
  )
}

export default Register
