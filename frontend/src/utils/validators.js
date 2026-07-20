export function isImageUrl(url) {
  return /\.(jpe?g|png|gif|webp|svg|bmp)(\?.*)?$/i.test(url.trim());
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
