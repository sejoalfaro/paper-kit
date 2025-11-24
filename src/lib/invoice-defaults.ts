import { InvoiceData } from '@/src/types/invoice'

/**
 * Datos iniciales por defecto para una nueva factura
 */
export const DEFAULT_INVOICE_DATA: InvoiceData = {
  issuer: {
    name: "",
    id: "",
    address: "",
    phone: "",
    email: "",
    website: "",
  },
  receiver: {
    name: "",
    id: "",
    address: "",
    phone: "",
    email: "",
  },
  details: {
    number: "INV-001",
    date: new Date().toISOString().split("T")[0],
    dueDate: "",
    currency: "USD",
    notes: "",
  },
  items: [
    {
      id: "1",
      description: "Servicios de Desarrollo Web",
      quantity: 1,
      price: 0,
      taxRate: 0,
    },
  ],
  discount: {
    type: "percentage",
    value: 0,
  },
} as const
