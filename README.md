# WebCraft — Web Development Learning Project

A React + Vite educational website that helps students learn web development, understand common errors, and follow step-by-step troubleshooting guides.

## Features

- Learning notes and examples for HTML, CSS, JavaScript, and React
- Common web-development errors and fixes
- Step-by-step guides for debugging and troubleshooting
- Reusable navigation, footer, cards, and code examples
- Contact form with browser local storage

## Run locally

```powershell
cd web-development-learning
npm.cmd install
npm.cmd run dev
```

Open the local URL printed by Vite, usually <http://localhost:5173/>.

## Production build

```powershell
cd web-development-learning
npm.cmd run build
npm.cmd run preview
```

## Project structure

- `src/components` — reusable navigation, footer, cards, and code examples
- `src/pages` — home, about, errors, guides, learning, code helper, and contact pages
- `src/data` — learning notes and troubleshooting content
- `src/styles.css` — responsive application styling
