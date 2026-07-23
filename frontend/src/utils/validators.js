import validator from "validator";

export function isValidUrl(url) {
  return validator.isURL(url.trim());
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
