import { NextRequest } from 'next/server'
import { chromium } from 'playwright'
import {
  BROWSER_LAUNCH_OPTIONS,
  PAGE_GOTO_OPTIONS,
  STYLE_LOAD_DELAY,
  PDF_OPTIONS,
} from '@/src/lib/playwright-config'
import { env } from '@/src/env'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const encodedData = searchParams.get('data')
  const theme = searchParams.get('theme') || 'light'

  if (!encodedData) {
    return new Response(
      JSON.stringify({ error: 'Missing invoice data' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }

  const baseUrl = env.NEXT_PUBLIC_APP_URL

  const invoiceUrl = `${baseUrl}/invoice?data=${encodeURIComponent(encodedData)}&print=true&theme=${theme}`

  let browser = null

  try {
    console.log('[PDF Generation] Starting process...')
    console.log('[PDF Generation] URL:', invoiceUrl)
    console.log('[PDF Generation] Environment:', process.env.NODE_ENV)
    
    browser = await chromium.launch(BROWSER_LAUNCH_OPTIONS)
    console.log('[PDF Generation] Browser launched successfully')

    const page = await browser.newPage({
      ignoreHTTPSErrors: true,
    })
    console.log('[PDF Generation] New page created')

    // Log de eventos de la página
    page.on('console', msg => console.log('[Browser Console]', msg.text()))
    page.on('pageerror', error => console.error('[Browser Error]', error))
    page.on('requestfailed', request => {
      console.error('[Request Failed]', {
        url: request.url(),
        failure: request.failure()?.errorText,
        method: request.method(),
        resourceType: request.resourceType()
      })
    })
    page.on('response', response => {
      if (!response.ok()) {
        console.warn('[Response Error]', {
          url: response.url(),
          status: response.status(),
          statusText: response.statusText()
        })
      }
    })

    const startTime = Date.now()
    console.log('[PDF Generation] Navigating to page...')
    
    await page.goto(invoiceUrl, PAGE_GOTO_OPTIONS)
    
    const loadTime = Date.now() - startTime
    console.log(`[PDF Generation] Page loaded successfully in ${loadTime}ms`)

    await page.waitForTimeout(STYLE_LOAD_DELAY)
    console.log('[PDF Generation] Style delay completed')

    const pdfBuffer = await page.pdf(PDF_OPTIONS)
    console.log('[PDF Generation] PDF generated successfully')

    await browser.close()
    console.log('[PDF Generation] Browser closed')

    let invoiceNumber = 'invoice'
    try {
      const decoded = JSON.parse(atob(decodeURIComponent(encodedData)))
      invoiceNumber = decoded.details?.number || 'invoice'
    } catch (e) {
    }

    return new Response(pdfBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="factura-${invoiceNumber}.pdf"`,
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    })
  } catch (error) {
    console.error('[PDF Generation] ERROR:', error)
    
    if (error instanceof Error) {
      console.error('[PDF Generation] Error name:', error.name)
      console.error('[PDF Generation] Error message:', error.message)
      console.error('[PDF Generation] Error stack:', error.stack)
    }

    if (browser) {
      try {
        await browser.close()
        console.log('[PDF Generation] Browser closed after error')
      } catch (closeError) {
        console.error('[PDF Generation] Error closing browser:', closeError)
      }
    }

    return new Response(
      JSON.stringify({
        error: 'Error generating PDF',
        message: error instanceof Error ? error.message : 'Unknown error',
        type: error instanceof Error ? error.name : 'Unknown',
        url: invoiceUrl
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}
