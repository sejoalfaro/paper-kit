import { useMemo } from 'react'
import { InvoiceData } from '@/src/types/invoice'

/**
 * Hook personalizado para cálculos de factura
 * Usa useMemo para optimizar rendimiento
 */
export function useInvoiceCalculations(data: InvoiceData) {
  const subtotal = useMemo(() => {
    return data.items.reduce((acc, item) => acc + item.quantity * item.price, 0)
  }, [data.items])

  const discount = useMemo(() => {
    if (data.discount.type === "percentage") {
      return (subtotal * data.discount.value) / 100
    }
    return data.discount.value
  }, [subtotal, data.discount])

  const tax = useMemo(() => {
    const subtotalAfterDiscount = subtotal - discount
    return data.items.reduce((acc, item) => {
      const itemSubtotal = item.quantity * item.price
      const itemProportion = subtotal > 0 ? itemSubtotal / subtotal : 0
      const itemAfterDiscount = subtotalAfterDiscount * itemProportion
      return acc + (itemAfterDiscount * item.taxRate) / 100
    }, 0)
  }, [data.items, subtotal, discount])

  const total = useMemo(() => {
    return subtotal - discount + tax
  }, [subtotal, discount, tax])

  return { subtotal, discount, tax, total }
}
