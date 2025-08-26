export function isValidEmail(email: string) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function isValidPassword(password: string) {
  const regex = /^(?=.*\d).{4,}$/;
  return regex.test(password);
}