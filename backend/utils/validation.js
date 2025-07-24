const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validatePassword = (password) => {
  return password && password.length >= 6
}

const validateUsername = (username) => {
  return username && username.length >= 3 && username.length <= 30
}

const sanitizeInput = (input) => {
  if (typeof input !== "string") return input
  return input.trim().replace(/[<>]/g, "")
}

module.exports = {
  validateEmail,
  validatePassword,
  validateUsername,
  sanitizeInput,
}
