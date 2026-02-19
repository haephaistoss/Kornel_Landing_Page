# Palyazz Landing Page

A modern, mobile-first single-page landing page for Palyazz, a pályázat (grant/tender) management company featuring glassmorphism design. Visit: **palyazz.eu**

## Features

- **Glassmorphism Design**: Modern frosted glass aesthetic with blur effects and transparency
- **Mobile-First**: Responsive design that works perfectly on all devices
- **Smooth Animations**: CSS animations and scroll-triggered effects
- **Accessible**: Follows accessibility best practices with reduced motion support
- **No Dependencies**: Pure HTML, CSS, and vanilla JavaScript

## Project Structure

```
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styling (glassmorphism, responsive, animations)
├── js/
│   └── main.js         # JavaScript functionality
├── .github/
│   └── copilot-instructions.md
└── README.md
```

## Sections

1. **Hero** - Main call to action with gradient background
2. **Services** - Four service cards showcasing key offerings
3. **About** - Company information with animated statistics
4. **Contact** - Contact form and company contact information
5. **Footer** - Navigation links and copyright

## Getting Started

### Development

Simply open `index.html` in a web browser. No build step required.

For local development with live reload, you can use any static file server:

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js (npx)
npx serve

# Using VS Code Live Server extension
# Right-click index.html → Open with Live Server
```

### Customization

- **Colors**: Edit CSS variables in `:root` in `css/styles.css`
- **Content**: Edit text content directly in `index.html`
- **Contact Form**: Connect to your backend by modifying the form handler in `js/main.js`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Note: `backdrop-filter` for glassmorphism effects requires modern browser support. A fallback is provided for older browsers.

## Design Notes

### Glassmorphism Effect

The glass effect is achieved using:
```css
background: rgba(255, 255, 255, 0.15);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.2);
```

### Color Palette

| Variable | Color | Usage |
|----------|-------|-------|
| `--primary-color` | #6366f1 | Primary actions |
| `--secondary-color` | #8b5cf6 | Gradients |
| `--accent-color` | #06b6d4 | Highlights |
| `--background-start` | #667eea | Gradient start |
| `--background-end` | #764ba2 | Gradient end |

## License

© 2026 Palyazz. All rights reserved.
