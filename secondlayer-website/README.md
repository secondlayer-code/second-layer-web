# Second Layer website

The marketing website for Second Layer (secondlayer.co.in). Plain HTML, CSS and JavaScript. There is no build step: the files in this folder are the website.

## Put it on GitHub

1. Go to github.com and sign in.
2. Click **New repository**. Name it `secondlayer-website`. Leave "Add a README" unticked. Click **Create repository**.
3. On the new repository page, click **uploading an existing file**.
4. Open this folder on your computer, select **everything inside it** (not the folder itself) and drag it into the browser.
5. Wait for the upload to finish, then click **Commit changes**.

`index.html` must sit at the top level of the repository, next to the `assets` and `api` folders.

## Put it live with Vercel

1. Go to vercel.com and sign up with your GitHub account.
2. Click **Add New > Project** and pick the `secondlayer-website` repository.
3. Leave every setting as it is (Framework Preset: Other, no build command). Click **Deploy**.
4. You get a live address ending in `.vercel.app` in about a minute.

After this, every change you commit on GitHub goes live automatically.

## Connect secondlayer.co.in

1. In Vercel, open the project, then **Settings > Domains**.
2. Add `secondlayer.co.in`.
3. Vercel shows the DNS records to add. Add them where you bought the domain.

## Make the audit form save leads

Until this is set up, the form opens the visitor's email app with their details filled in.

1. Create a webhook in a tool such as Make, Zapier, n8n or Google Apps Script that adds a row to a Google Sheet and sends you an alert.
2. In Vercel, open **Settings > Environment Variables**.
3. Add a variable named `LEAD_WEBHOOK_URL` with the webhook address as its value.
4. Redeploy the project.

Never put the webhook address in the website files.

## Edit text, prices and links

Everything is in `assets/js/content.js`:

- **WhatsApp:** set `whatsapp` to your number, digits only with country code (for example `919876543210`). The WhatsApp button appears on its own.
- **Prices and what's included:** edit `plans`. `in` is rupees, `intl` is US dollars. Also update `from` under `services` so the service cards show the same price.
- **Service text:** edit `services` (name, tagline, description and bullet list).
- **Founding offer banner:** set `foundingOffer` under `flags` to `false` to hide it.
- **Photos:** stored in `assets/img/photos` in three sizes (480, 800 and 1200 pixels wide). Each `img` value in `content.js` is the file name without the size, for example `website-design-for-local-business`. The photos are from Unsplash (free licence).
- **Free business check questions:** edit `check`.

## After every update

Re-upload the changed files to GitHub (**Add file > Upload files**, then commit). Files with the same name are replaced. Vercel republishes within a minute.

## Files

| File or folder | What it is |
|---|---|
| `index.html` | Home page |
| `services.html`, `pricing.html`, `about.html`, `contact.html` | Main pages |
| `portfolio.html` | "Coming soon" page |
| `privacy.html`, `thank-you.html` | Privacy notice and form confirmation |
| `assets/js/content.js` | All text, prices and links |
| `assets/js/site.js` | Navigation, popup, pricing, forms and animations |
| `assets/js/hero3d.js` | The 3D hero on the home page |
| `assets/css/styles.css` | All styles |
| `api/lead.js` | Receives the audit form and forwards it to your webhook |
| `vercel.json` | Clean addresses (`/pricing` instead of `/pricing.html`) |
