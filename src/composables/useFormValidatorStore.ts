export const phoneNoValidator = (value: string): boolean => {
  return /^(01)\d{7,8}$/.test(value)
}
