'use client'

import React from 'react'
import { Share2, Check } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import { InvoiceData } from '@/src/types/invoice'
import { copyShareableUrl } from '@/src/lib/share-invoice'

type Props = { 
  invoiceData: InvoiceData
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | 'secondary'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
}

export function InvoiceShareButton({ 
  invoiceData, 
  variant = 'outline',
  size = 'lg',
  className = ''
}: Props) {
  const [copied, setCopied] = React.useState(false)

  const handleShare = async () => {
    const success = await copyShareableUrl(invoiceData)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Button 
      onClick={handleShare} 
      variant={variant}
      size={size}
      className={className}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          ¡Copiado!
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4" />
          Compartir
        </>
      )}
    </Button>
  )
}
