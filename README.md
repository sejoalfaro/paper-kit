# Paperly
Create stunning invoices with a design system inspired by Vercel.

This tool focuses purely on aesthetics and simplicity. It is not an accounting system; it takes your data and renders a crisp, minimalist PDF ready to send.

## Features
- ✨ **Minimalist**: High contrast, clean typography.
- 🚀 **Fast**: Generates lightweight PDFs instantly.
- 🎨 **Customizable**: Easy to adapt the data structure.
- 🔓 **Open Source**: Apache License 2.
- 🌐 **Cross-browser**: Server-side PDF generation with Playwright (no Safari issues!)
- 📱 **Responsive**: Works perfectly on all devices.

## PDF Generation

This project uses **Playwright + Chromium** for server-side PDF generation, ensuring consistent results across all browsers and devices.

### Why Playwright?
- ✅ Consistent PDFs on all platforms (iOS, Android, Safari, Chrome)
- ✅ Perfect print quality with full CSS support
- ✅ No client-side dependencies
- ✅ Complete control over format and margins

### Quick Start

1. **Install dependencies**:
```bash
pnpm install
```

2. **Install Chromium** (development only):
```bash
npx playwright install chromium
```

3. **Run the development server**:
```bash
pnpm dev
```

4. **Test PDF generation**:
- Open http://localhost:3000/invoice
- Click "Descargar PDF"

### Documentation

- 📄 [PDF Generation Guide](./PDF_GENERATION.md) - Complete setup and deployment guide
- 🚀 [Advanced Usage](./ADVANCED_USAGE.md) - Database integration, caching, optimization

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **PDF Generation**: Playwright + Chromium
- **Language**: TypeScript
- **Package Manager**: pnpm

## Deployment

This project is configured for **Railway** and **Dokploy** with automatic Chromium installation via `nixpacks.toml`.

### Deploy to Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new)

The `nixpacks.toml` configuration will automatically install Chromium during deployment.

### Environment Variables

```env
NEXT_PUBLIC_APP_URL=https://your-app.com
```

## Project Structure

```
src/
├── app/
│   ├── invoice/
│   │   ├── page.tsx                    # Main invoice editor
│   │   └── print/[id]/page.tsx        # Print-friendly version
│   └── api/
│       └── invoice/[id]/pdf/route.ts  # PDF generation API
├── components/
│   └── invoice/
│       ├── invoice-download-button.tsx
│       └── ...
├── lib/
│   └── playwright-config.ts           # Playwright settings
└── types/
    └── invoice.ts
```
