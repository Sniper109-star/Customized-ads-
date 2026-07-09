# Next.js Starter Template

A modern Next.js 16 starter template with TypeScript, Tailwind CSS 4, and best practices built-in.

## Features

- **Next.js 16** with App Router
- **React 19** for UI
- **TypeScript** for type safety
- **Tailwind CSS 4** for styling
- **ESLint** for code quality
- **Prettier** for formatting
- **Lucide React** for icons
- **Standard components** ready to use

## Getting Started

```bash
# Install dependencies
bun install

# Start development server
bun dev

# Build for production
bun build

# Run linter
bun lint

# Type check
bun typecheck

# Format code
bun format
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   ├── about/page.tsx      # About page
│   └── api/
│       └── health/route.ts # Health check API
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── button.tsx
│   │   └── card.tsx
│   └── layout/             # Layout components
│       ├── header.tsx
│       └── footer.tsx
├── lib/                    # Utilities
│   ├── utils.ts
│   └── constants.ts
└── types/                  # TypeScript types
    └── index.ts
```

## Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start development server |
| `bun build` | Build for production |
| `bun start` | Start production server |
| `bun lint` | Run ESLint |
| `bun typecheck` | Run TypeScript checks |
| `bun format` | Format code with Prettier |

## License

MIT
