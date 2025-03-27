export function formatPrice(price: number) {
  return price.toLocaleString('pt-br', {
    minimumFractionDigits: 2,
    style: 'currency',
    currency: 'BRL',
  })
}
