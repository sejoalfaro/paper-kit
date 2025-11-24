"use client"

import { useSearchParams } from 'next/navigation'
import { Plus } from 'lucide-react'
import { Navbar } from '@/src/components/navbar'
import { Footer } from '@/src/components/footer'
import { Button } from '@/src/components/ui/button'
import { InvoiceHeader } from '@/src/components/invoice/invoice-header'
import { InvoiceClient } from '@/src/components/invoice/invoice-client'
import { InvoiceItemsTable } from '@/src/components/invoice/invoice-items-table'
import { InvoiceItemsMobile } from '@/src/components/invoice/invoice-items-mobile'
import { InvoiceSummary } from '@/src/components/invoice/invoice-summary'
import { InvoiceDownloadButton } from '@/src/components/invoice/invoice-download-button'
import { InvoiceShareButton } from '@/src/components/invoice/invoice-share-button'
import { useInvoiceData } from '@/src/hooks/use-invoice-data'
import { useInvoiceTheme } from '@/src/hooks/use-invoice-theme'
import { useInvoiceCalculations } from '@/src/hooks/use-invoice-calculations'
import { useInvoiceHandlers } from '@/src/hooks/use-invoice-handlers'

export function InvoiceGenerator() {
  const searchParams = useSearchParams()
  const printMode = searchParams.get('print') === 'true'
  
  // Custom hooks para separar concerns
  const [data, setData] = useInvoiceData()
  useInvoiceTheme()
  const { subtotal, discount, tax, total } = useInvoiceCalculations(data)
  const {
    handleIssuerChange,
    handleReceiverChange,
    handleDetailsChange,
    handleDiscountChange,
    handleItemChange,
    addItem,
    removeItem,
  } = useInvoiceHandlers(setData)

  return (
    <>
      {!printMode && <Navbar />}
      <div id="invoice-page" className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 print:p-0 print:m-0 print:min-h-0 print:overflow-visible bg-background">
        {!printMode && (
          <div className="max-w-4xl mx-auto mb-6 flex justify-end gap-3 no-print">
            <InvoiceShareButton invoiceData={data} />
            <InvoiceDownloadButton invoiceData={data} />
          </div>
        )}

        <div className="max-w-4xl mx-auto rounded-xl shadow-sm border overflow-hidden print:shadow-none print:border-none print:rounded-none bg-card text-card-foreground border-border">

          <InvoiceHeader
            data={data}
            onIssuerChange={handleIssuerChange}
            onDetailsChange={handleDetailsChange}
          />

          <InvoiceClient
            data={data}
            onReceiverChange={handleReceiverChange}
          />

          <div className="p-4 sm:p-6 md:p-10 print:p-10">
            <InvoiceItemsTable
              items={data.items}
              currency={data.details.currency}
              onItemChange={handleItemChange}
              onRemoveItem={removeItem}
            />

            <InvoiceItemsMobile
              items={data.items}
              currency={data.details.currency}
              onItemChange={handleItemChange}
              onRemoveItem={removeItem}
            />

            <div className="mt-4 no-print">
              <Button onClick={addItem} variant="ghost" size="sm">
                <Plus className="w-4 h-4" />
                Agregar línea
              </Button>
            </div>
          </div>

          <InvoiceSummary
            data={data}
            subtotal={subtotal}
            discount={discount}
            tax={tax}
            total={total}
            onDetailsChange={handleDetailsChange}
            onDiscountChange={handleDiscountChange}
          />

          <div className="p-6 text-center border-t border-border">
            <p className="text-xs text-muted-foreground italic">
              Documento generado electrónicamente. Válido sin firma o sello.
            </p>
          </div>
        </div>
      </div>
      {!printMode && <Footer />}
    </>
  )
}
