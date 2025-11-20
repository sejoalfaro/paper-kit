export function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: currency,
  }).format(amount)
}

export function getCurrencySymbol(currency: string) {
  const symbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    CRC: "₡",
    MXN: "$",
  }
  return symbols[currency] || currency
}

export function localeDateString(dateString: string) {
  if (!dateString) return ""
  const [year, month, day] = dateString.split("-")
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).toLocaleDateString("es-ES")
}
