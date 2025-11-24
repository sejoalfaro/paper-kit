import { Suspense } from 'react'
import { InvoiceGenerator } from '@/src/components/invoice/invoice-generator'
import { InvoiceSkeleton } from '@/src/components/invoice/invoice-skeleton'

export default function InvoicePage() {
  return (
    <Suspense fallback={<InvoiceSkeleton />}>
      <InvoiceGenerator />
    </Suspense>
  )
}
