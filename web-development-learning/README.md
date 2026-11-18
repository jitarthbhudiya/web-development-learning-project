# CodeStart — Web Development Learning & Troubleshooting

A React + Vite educational website based on the supplied Web Development Proposal.

## Requirements
- Node.js (LTS recommended)
- npm

## Run locally (Windows PowerShell)
```powershell
cd path\to\web-development-learning
npm.cmd install
npm.cmd run dev
```
Open the local URL printed by Vite, usually http://localhost:5173/.

If PowerShell allows npm scripts, `npm install` and `npm run dev` also work. If it reports that `npm.ps1` is blocked, use the `.cmd` commands above.

## Production build
```powershell
npm.cmd run build
npm.cmd run preview
```

## Project structure
- `src/components` reusable navigation, footer, cards and code examples
- `src/pages` Home, About, Errors, Fix Guides, Learn, Code Helper and Contact pages
- `src/data` learning notes and troubleshooting guide content
- `src/styles.css` responsive styling

## Notes
- `node_modules` is created on your computer by `npm.cmd install`; it is intentionally not included in the ZIP.
- Contact form submissions are stored in the current browser's localStorage. There is no backend or email delivery in this first frontend version.
- The Code Helper matches pasted text against a curated local guide library in the browser. It is not a generative AI service and does not send or save submitted code. A real AI integration would need a secure backend; do not put a private API key in frontend code.
- The Learn page includes short notes, examples, and links to official documentation for HTML, CSS, JavaScript, React, and browser/project tools.
- Replace the sample contact email/phone in `src/pages/Contact.jsx` with your actual contact details.
