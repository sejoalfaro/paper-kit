import { useCallback } from 'react'
import { InvoiceData, InvoiceItem } from '@/src/types/invoice'

/**
 * Hook personalizado para handlers de la factura
 * Usa useCallback para optimizar rendimiento
 */
export function useInvoiceHandlers(
  setData: React.Dispatch<React.SetStateAction<InvoiceData>>
) {
  const handleIssuerChange = useCallback(
    (field: keyof InvoiceData["issuer"], value: string) => {
      setData((prev) => ({ 
        ...prev, 
        issuer: { ...prev.issuer, [field]: value } 
      }))
    },
    [setData]
  )

  const handleReceiverChange = useCallback(
    (field: keyof InvoiceData["receiver"], value: string) => {
      setData((prev) => ({ 
        ...prev, 
        receiver: { ...prev.receiver, [field]: value } 
      }))
    },
    [setData]
  )

  const handleDetailsChange = useCallback(
    (field: keyof InvoiceData["details"], value: string) => {
      setData((prev) => ({ 
        ...prev, 
        details: { ...prev.details, [field]: value } 
      }))
    },
    [setData]
  )

  const handleDiscountChange = useCallback(
    (field: keyof InvoiceData["discount"], value: string | number) => {
      setData((prev) => ({ 
        ...prev, 
        discount: { ...prev.discount, [field]: value } 
      }))
    },
    [setData]
  )

  const handleItemChange = useCallback(
    (id: string, field: keyof InvoiceItem, value: string | number) => {
      setData((prev) => ({
        ...prev,
        items: prev.items.map((item) => 
          item.id === id ? { ...item, [field]: value } : item
        ),
      }))
    },
    [setData]
  )

  const addItem = useCallback(() => {
    const newItem: InvoiceItem = {
      id: crypto.randomUUID(),
      description: "",
      quantity: 1,
      price: 0,
      taxRate: 0,
    }
    setData((prev) => ({ ...prev, items: [...prev.items, newItem] }))
  }, [setData])

  const removeItem = useCallback(
    (id: string) => {
      setData((prev) => {
        // No permitir eliminar el último item
        if (prev.items.length === 1) return prev
        return { ...prev, items: prev.items.filter((item) => item.id !== id) }
      })
    },
    [setData]
  )

  return {
    handleIssuerChange,
    handleReceiverChange,
    handleDetailsChange,
    handleDiscountChange,
    handleItemChange,
    addItem,
    removeItem,
  }
}
