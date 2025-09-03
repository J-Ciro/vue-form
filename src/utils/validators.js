export const validators = {
  required: (value) => {
    return value !== null && value !== undefined && value !== ''
  },
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
  },
  minLength: (value, length) => {
    return value.length >= length
  },
  isAlpha: (value) => {
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/.test(value)
  },
  isNumber: (value) => {
    return /^\d+$/.test(value)
  },
  isAdult: (birthDate) => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }

    return age >= 18
  },
  passwordsMatch: (confirmPassword, getPassword) => {
    const password = typeof getPassword === 'function' ? getPassword() : getPassword
    return confirmPassword === password
  },
}
