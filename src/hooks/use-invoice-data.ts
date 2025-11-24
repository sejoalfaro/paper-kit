import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { InvoiceData } from '@/src/types/invoice'
import { decodeInvoiceData } from '@/src/lib/share-invoice'
import { DEFAULT_INVOICE_DATA } from '@/src/lib/invoice-defaults'

/**
 * Hook personalizado para manejar los datos de la factura
 * Carga datos desde URL o usa valores por defecto
 */
export function useInvoiceData() {
  const searchParams = useSearchParams()
  const dataParam = searchParams.get('data')
  
  const [data, setData] = useState<InvoiceData>(() => {
    if (dataParam) {
      const decoded = decodeInvoiceData(dataParam)
      return decoded || DEFAULT_INVOICE_DATA
    }
    return DEFAULT_INVOICE_DATA
  })
  
  // Actualizar datos si cambia el parámetro en la URL
  useEffect(() => {
    if (dataParam) {
      const decoded = decodeInvoiceData(dataParam)
      if (decoded) {
        setData(decoded)
      }
    }
  }, [dataParam])

  return [data, setData] as const
}
