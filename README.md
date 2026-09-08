# Enzone Global website

Static, responsive catalogue website for Enzone Global Limited.

## Run locally
This version does not require npm, React or a backend.
Open `index.html` directly in a browser, or use VS Code Live Server.

## Add the logo
Put the Enzone Global logo at:
`images/logo.png`

## Add product images
Each product has three image slots in `data/products.js`.
For example:
`images/products/commercial-ovens-1.jpg`
`images/products/commercial-ovens-2.jpg`
`images/products/commercial-ovens-3.jpg`

The product cards automatically rotate through the three angles. If an image is missing, a neutral placeholder appears.

## Change products
Edit `data/products.js`. You can add, remove or rename products without changing the main HTML.

## Hero image
The hero uses an external Unsplash image URL in `css/style.css`. You can replace that URL with another image URL at any time.

## Hosting
The site is static and can be pushed to GitHub and deployed to Vercel. No paid backend, database or ecommerce plugin is required.
