# TableFlow — Public Interactive Demo

A **read-only static preview** of TableFlow restaurant administration starter kit.

## Important
- All products, customers, orders and figures in this demo are fictional examples.
- No server, MongoDB, passwords, API keys, or `.env` are included.
- Search/filter and navigation work in the browser. Creation, editing and deletion are disabled.
- It is **not** the full source code delivered to Gumroad buyers.
- All source code in this public repository is publicly accessible; do not add private files.

## Publish on GitHub Pages
1. Create a **new public GitHub repository**, for example `tableflow-demo`.
2. Unzip this package; upload `index.html`, `.nojekyll`, `css/`, `js/` and `README.md` directly to the repository root.
3. In repository **Settings → Pages → Build and deployment**, select **Deploy from a branch**.
4. Select `main` and `/(root)` and click **Save**.
5. Open the URL GitHub displays after publication, commonly `https://YOUR-USERNAME.github.io/tableflow-demo/`.
6. Test overview, product filters, order filters and the button leading to Gumroad.
7. Place the verified demo link in your Gumroad product description.

## Local preview
Open `index.html` in a browser, or use a simple local web server. No `npm install` required.

## Editing the store link
The buy button currently points to `https://balfaroa.gumroad.com/l/pguhns`. Change the anchor in `index.html` if the product URL changes.

The stylesheet references Bootstrap 5.3.3 from jsDelivr (internet connection required for its styles). This is the public demo only; please consult project dependencies and licenses before final commercial distribution.
