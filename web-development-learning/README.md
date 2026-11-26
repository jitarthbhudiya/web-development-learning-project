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
- The Code Helper matches pasted text against a curated local guide library in the browser. It is not a generative AI service and does not send or save submitted code. Its optional Google, Bing, DuckDuckGo, Stack Overflow, GitHub, and MDN links open external search results only when clicked; the submitted text is then sent to that provider.
- The AI Helper sends submitted questions and code to OpenAI through the Vercel serverless function in `api/ai-help.js`. Set `OPENAI_API_KEY` and `OPENAI_MODEL` as private Vercel environment variables (never use the `VITE_` prefix). The example `.env.example` contains placeholders only. Do not submit secrets or confidential code; AI output can be incorrect.
- The endpoint has a basic in-memory per-IP request limit. Because Vercel can run multiple function instances, this is not a global usage quota; enable platform-level rate limiting or a shared rate-limit service before expecting significant public traffic.
- For Vercel, import the GitHub repository and set **Root Directory** to `web-development-learning`, with the production branch set to `main`. Add `OPENAI_API_KEY` and `OPENAI_MODEL` in the Vercel project's Environment Variables for the environments you want to use, then redeploy. Choose a model ID currently available to your API account. The Vercel config also enables direct links to React Router pages.
- To test the API locally, use Vercel CLI from `web-development-learning` with `vercel dev` after adding private values to a local `.env` file. Never commit `.env`; restart the local server after changing it.
- The Learn page includes short notes, examples, and links to official documentation for HTML, CSS, JavaScript, React, and browser/project tools.
- Replace the sample contact email/phone in `src/pages/Contact.jsx` with your actual contact details.
