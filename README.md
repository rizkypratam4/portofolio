# Rizky Pratama — Portfolio

Personal portfolio website built with React, TypeScript, and Tailwind CSS. Features a clean design with dark/light mode, smooth animations, and a functional contact form.

## Tech Stack

- **React 19** + **TypeScript**
- **Tailwind CSS v3**
- **Motion** (Framer Motion) — animations
- **Lucide React** — icons
- **EmailJS** — contact form email delivery
- **Vite** — build tool

## Features

- Dark / Light mode toggle
- Responsive layout (mobile, tablet, desktop)
- Smooth scroll with active section detection on navbar
- Animated hero section with floating cards
- Skills, Portfolio, Work Experience, Blog, and Contact sections
- Timeline layout for work experience
- Functional contact form via EmailJS
- Scroll-to-top button

## Getting Started

### Prerequisites

- Node.js >= 18
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/rizkprtama/portofolio.git
cd portofolio

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## EmailJS Setup

The contact form uses [EmailJS](https://emailjs.com) to send emails without a backend.

1. Create an account at [emailjs.com](https://emailjs.com)
2. Add an Email Service (Gmail/Outlook)
3. Create an Email Template with these variables:
   - `{{name}}` — sender's name
   - `{{email}}` — sender's email
   - `{{title}}` — subject
   - `{{message}}` — message body
4. Replace the credentials in `src/App.tsx`:

```ts
await emailjs.sendForm(
  'YOUR_SERVICE_ID',
  'YOUR_TEMPLATE_ID',
  formRef.current,
  'YOUR_PUBLIC_KEY'
);
```

## Project Structure

```
src/
├── App.tsx        # Main component (all sections)
├── index.css      # Global styles, Tailwind config, color system
├── main.tsx       # React entry point
└── assets/        # Static assets
```

## Color System

The project uses a CSS variable-based color system with full dark/light mode support defined in `src/index.css`.

| Token | Light | Dark |
|---|---|---|
| `--bg-base` | `#FAFAF8` | `#0D0D0D` |
| `--accent` | `#CC342D` | `#CC342D` |
| `--text-primary` | `#1A1A1A` | `#E8E0D5` |
| `--text-secondary` | `#6B6360` | `#A09488` |

## License

MIT
