export const setUser = user => {
  localStorage.setItem("jwt", user)
}

export const getUser = () => {
  try {
    const jwt = localStorage.getItem("jwt")
    if (jwt) {
      return jwt
    }
  } catch (err) {}
  return []
}

export const logoutUser = () => {
  localStorage.removeItem("jwt")
}
