export const SetUser = user => {
  localStorage.setItem("jwt", user)
}

export const GetUser = () => {
  try {
    const jwt = localStorage.getItem("jwt")
    if (jwt) {
      return jwt
    }
  } catch (err) {}
  return []
}

export const LogoutUser = () => {
  localStorage.removeItem("jwt")
}
