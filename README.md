# LandLord

A property search and comparison tool for buyers and renters across global markets.


## What it does

LandLord lets buyers and renters search, filter, and compare property listings across multiple markets. Listings are displayed in their original currency and viewers can toggle between USD, CAD, NGN, and AUD using live exchange rates — making it usable across different markets without any friction.


## Live demo

https://land-lord-website.netlify.app/

https://github.com/chi-obi/Land-Lord


## Screenshots

<img width="1469" height="792" alt="LandLord Screenshot" src="https://github.com/user-attachments/assets/79dae12b-2c9c-4d01-a6a1-91cd54d43eb3" />


## About

I built LandLord while transitioning from a career in sales and business development into software development. Coming from a background of selling across multiple industries, I understand the friction buyers and renters face when evaluating properties across fragmented platforms. This project is my attempt to solve that problem with clean, maintainable code — and to demonstrate that good software starts with understanding the user, not just the technology.


## Features

- Property listings rendered dynamically from a structured data layer
- Filter by listing type, city, bedroom count, and maximum price
- Multi-currency support with live exchange rates via a secured API
- Mortgage estimator on all buy listings with adjustable rate and amortization
- Original listing currency displayed on every card regardless of viewer preference
- Serverless function protects API key from client-side exposure
- Fully deployed and production-ready on Netlify
- Built with separation of concerns — data, utilities, components, 
  and orchestration in separate file
  

## Tech stack

- HTML5 and Tailwind CSS (utility-first styling)
- Vanilla JavaScript ES6+
- Netlify Serverless Functions
- ExchangeRate API
- Deployed on Netlify


## What I learned

- DOM manipulation and dynamic HTML generation from a data array
- JavaScript array methods — filter(), map(), forEach()
- Separation of Concerns architecture across multiple files
- Git version control and GitHub workflow
- Responsive layout with Tailwind's grid system


## Run locally

```bash
git clone https://github.com/chi-obi/Land-Lord.git
cd Land-Lord
```

Open `index.html` with VS Code Live Server. Note that the currency feature requires the Netlify function to run — exchange rates will not load in a purely local environment without a local functions runner.


## Architecture

Built with a deliberate separation of concerns across four files:

- `properties.js` — data layer only
- `utils.js` — formatting and calculation functions
- `components.js` — UI component templates
- `app.js` — orchestration, state, and event handling

Each file has one job. When something needs to change, only one file gets touched.


## Roadmap

- Property detail modal with full listing view
- Saved shortlist page using localStorage
- Agent contact form per listing
- User-submitted listings with currency selection
