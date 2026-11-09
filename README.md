# Thristan Edrick A. De Lara · Portfolio

A fast, single-page portfolio built with plain HTML, CSS and vanilla JavaScript. No framework and no build step, so you can host it on GitHub Pages as-is. It has a light and a dark theme.

```
index.html          page structure + link-preview (Open Graph) tags
css/style.css       all styles; theme colors at the very top
js/data.js          ALL your content  ← edit this
js/main.js          renders data.js + interactions
assets/             photo, logos, certificates, project screenshots
```

## 1. Edit your content (`js/data.js`)

Open `js/data.js` in any editor. Everything is a plain JavaScript object or array. Change the text between the quotes and keep the commas and brackets. Anything set to `"TBD"` (or `""`) is hidden on the page until you fill it in.

| Section | What to change |
|---|---|
| `profile` | name, `roles` (first one is shown fixed), `typedRoles` (typed out one after another), value statement, Hero highlights (numbers count up), bio paragraphs, quick facts, photo crop |
| `logos` | the official logo file and brand color for each tool or brand (see "Skills and logos" below) |
| `marquee` | which logos scroll in the strip above the skill cards |
| `skills` / `softSkills` | skill groups and soft-skill chips |
| `projects` | one object per project; each opens as a case study |
| `achievements` | your certificates |
| `contact` / `socials` | email, contact text and profile links |

Tip: if the page goes blank after editing, you probably deleted a comma or quote. Press F12 → Console to see the line with the error.

### Projects (case studies)

Each project card opens a case study with **Problem**, **Solution**, **My role**, **Tech used**, **Key features** and screenshots.

| Field | Meaning |
|---|---|
| `featured: true` | shows this project as the big card at the top (use it for one project) |
| `title`, `fullTitle` | short name on the card; optional long title shown in the case study |
| `category`, `tag`, `year` | small labels on the card, e.g. "Mobile · 2026" and a "Thesis" badge. `tag` can also be a list: `["Research Study", "Machine Learning"]` |
| `icon`, `color` | optional small icon on the card, e.g. `icon: "leaf", color: "#22c55e"` |
| `problem`, `solution`, `role`, `process`, `results` | the case-study text; `"TBD"` hides that block |
| `tech` | technologies; names that match the `logos` list get their logo automatically |
| `features` | bullet list of key features |
| `device` | `"phone"` for portrait mobile screenshots (shown in phone frames), otherwise `"desktop"` |
| `cover` | image(s) on the card; for phones, 2–3 screenshots side by side |
| `coverPosition` | optional focus point for a wide cover that gets cropped, e.g. `"left top"` |
| `gallery` | all screenshots in the case study, each `{ src, caption }` |
| `demo`, `github` | links; `"TBD"` hides the button |
| `galleryNote` | small note under the case-study screenshots |
| `bars` | optional bar chart in the case study: `{ title, note, items: [{ label, value }] }` (value in %) |
| `scan` | CrabLens only: the animated detection box drawn over one phone screenshot (`box` is x, y, width, height in image pixels) |

The Plant Disease Detection screenshots (`plant-upload.png`, `plant-results.png`) are clean recreations of the original app; their editable HTML sources and re-render steps are in `assets/projects/mockups/`.

The CrabLens card uses `assets/projects/crablens-live.jpg`, a copy of the live-detection screenshot with the app's own pink box removed, so the site can draw its own animated box in the same place. If you replace it, use a screenshot without a box, or delete `scan` to turn the effect off.

To **add a project**, copy one `{ ... },` block inside `projects`, paste it below and edit it. Give it a unique `id`.

### Skills and logos

Each skill has a `level` label: `"Proficient"`, `"Intermediate"` or `"Familiar"` (no percentages), a short `description`, and one or more `logos`.

Logos are official SVG files stored in `assets/icons/` (from [Devicon](https://devicon.dev) and [Simple Icons](https://simpleicons.org)). To add one:

1. Download the SVG, e.g. from Devicon `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/react/react-original.svg`, and save it as `assets/icons/react.svg`.
   Simple Icons logos are single-color; add the brand color by putting `fill="#61DAFB"` on the `<svg>` tag.
2. Add it to `logos` in `js/data.js`: `"React": { src: "assets/icons/react.svg", color: "#61DAFB" },` (the color is used for the hover glow on skill cards). Add the name to `marquee` too if you want it in the scrolling strip.
3. Use the same name in a skill (`logos: ["React"]`) or a project's `tech` list.

Logos sit on a small light tile, so dark logos stay visible in dark mode.

## 2. Where to put your images

| File | Notes |
|---|---|
| `assets/profile.jpg` | Your photo (the file name must match `profile.photo` in `js/data.js`). If it's missing, a placeholder is shown. Windows hides file extensions by default, so check the real name with View → Show → File name extensions. |
| `assets/og-image.jpg` | 1200×630 image shown when your link is shared on LinkedIn or Messenger (made from your photo). |
| `assets/projects/` | Project screenshots (JPG). Crop out browser bars and the taskbar so only the app shows. |
| `assets/achievements/` | Certificates (full size), with small card images in `assets/achievements/thumbs/`. |

**Photo crop:** the photo file is never edited. `profile.photoCrop.hero` in `js/data.js` sets which part shows in the Hero frame: `x`/`y` is the point to keep in view and `zoom` is how close to get. Adjust the numbers and refresh until it looks right.

Keep images light (ideally under 300 KB each). [squoosh.app](https://squoosh.app) can compress them for free.

### Adding a certificate

1. Copy the file into `assets/achievements/` with a short lowercase name, e.g. `cert-python-basics-2026.jpg`.
2. Make a small card image (about 640 px wide, JPG) and put it in `assets/achievements/thumbs/`. For a **PDF**, take a screenshot of page 1 and save it as the thumbnail.
3. Add an entry to `achievements` in `js/data.js`:
   ```js
   {
     title: "Python Basics",
     issuer: "Organizer name",
     date: "2026-03-15",             // YYYY-MM-DD, or "TBD"
     description: "One short sentence.",
     thumb: "assets/achievements/thumbs/cert-python-basics-2026.jpg",
     file: "assets/achievements/cert-python-basics-2026.jpg",   // or a .pdf
   },
   ```

Certificates are sorted newest first, and the "Certificates" highlight in the Hero counts them automatically.

## 3. Change the theme colors

All colors are CSS variables at the top of `css/style.css`:

- `:root { ... }` is the **light** theme.
- `:root[data-theme="dark"] { ... }` is the **dark** theme.

The main ones are `--bg` (page background), `--surface` (cards), `--text`, `--text-muted`, `--accent` (blue: links and highlights), `--teal` (second accent), `--grad` / `--grad-btn` (the blue→teal gradients on headings, labels and buttons), `--glow-a` / `--glow-b` (soft corner glows) and `--canvas-rgb` (color of the Hero's dot network). Change a value in both blocks and every part of the site follows. If you change text or button colors, check the contrast with a tool like [WebAIM's contrast checker](https://webaim.org/resources/contrastchecker/); normal text needs at least 4.5:1.

The site starts in the visitor's system theme (light or dark). The sun/moon button switches it, and the browser remembers that choice. The favicon (`assets/favicon.svg`) uses the same blue; edit its `fill` if you change the accent.

## 4. Preview locally

Opening `index.html` directly works. A tiny local server is closer to how GitHub Pages behaves:

```bash
# in this folder
python -m http.server 8000 --bind 127.0.0.1
# then open http://127.0.0.1:8000
```

(Or use the "Live Server" extension in VS Code.)

## 5. Deploy to GitHub Pages

1. Create a new repository on GitHub, e.g. `portfolio` (or `your-username.github.io` for a root URL).
2. Upload the files: either drag and drop everything in this folder into **Add file → Upload files** on GitHub, or use git:
   ```bash
   git init
   git add .
   git commit -m "My portfolio"
   git branch -M main
   git remote add origin https://github.com/your-username/portfolio.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, choose **main** and **/ (root)**, then **Save**.
4. After a minute your site is live at `https://your-username.github.io/portfolio/` (or `https://your-username.github.io/` for a `your-username.github.io` repo).

**Live site:** https://veighlat-cmd.github.io/thristan-de-lara/ (repository: https://github.com/veighlat-cmd/thristan-de-lara).
The link-preview tags in `index.html` (`og:url`, `og:image`, `canonical`) already use this address; update them if the site moves.

**To update the live site** after editing files, run these in the project folder (VS Code terminal):

```bash
git add .
git commit -m "Describe what you changed"
git push
```

GitHub Pages rebuilds automatically; changes appear within a minute or two (press Ctrl + F5 to skip the browser cache).
