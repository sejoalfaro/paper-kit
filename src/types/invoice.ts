export interface InvoiceItem {
  id: string
  description: string
  quantity: number
  price: number
  taxRate: number
}

export interface InvoiceData {
  issuer: {
    name: string
    id: string
    address: string
    phone: string
    email: string
    website: string
  }
  receiver: {
    name: string
    id: string
    address: string
    phone: string
    email: string
  }
  details: {
    number: string
    date: string
    dueDate: string
    currency: string
    notes: string
  }
  items: InvoiceItem[]
  discount: {
    type: "percentage" | "fixed"
    value: number
  }
}
