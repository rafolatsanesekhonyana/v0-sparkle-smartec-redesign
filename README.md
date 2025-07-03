# SparkleSmart Technologies Website

A modern, responsive website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🚀 Built with Next.js 14 and App Router
- 💎 TypeScript for type safety
- 🎨 Tailwind CSS for styling
- 📱 Fully responsive design
- ⚡ Fast performance and SEO optimized
- 🎯 Modern UI components with shadcn/ui
- 🌟 Smooth animations and transitions

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd sparklesmart-website
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
├── app/                    # Next.js 14 App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   ├── about/             # About page
│   ├── services/          # Services page
│   ├── contact/           # Contact page
│   ├── team/              # Team page
│   ├── portfolio/         # Portfolio page
│   ├── blog/              # Blog page
│   └── quote/             # Quote page
├── components/            # Reusable components
│   ├── ui/                # shadcn/ui components
│   ├── header.tsx         # Header component
│   ├── footer.tsx         # Footer component
│   └── logo.tsx           # Logo component
├── lib/                   # Utility functions
└── public/                # Static assets
\`\`\`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI components
- **Lucide React** - Beautiful icons
- **Radix UI** - Accessible component primitives

## Color Scheme

The website uses a blue and orange color scheme:
- Primary: Blue (#2563eb)
- Secondary: Orange (#ea580c)
- Background: Dark slate gradients
- Text: White and gray variants

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

## License

This project is licensed under the MIT License.
