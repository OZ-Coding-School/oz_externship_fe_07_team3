export const formatPhoneNumber = (value: string) => {
  const numbers = value.replace(/\D/g, '').slice(0, 11)

  if (numbers.length <= 3) {
    return numbers
  }

  if (numbers.length <= 7) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3)}`
  }

  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`
}

export const normalizePhoneNumber = (value: string) => {
  return value.replace(/\D/g, '').slice(0, 11)
}
