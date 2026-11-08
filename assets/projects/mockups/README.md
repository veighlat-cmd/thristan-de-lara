# Plant Disease Detection: interface mockups

These pages recreate the original app's two screens (the only screenshots were blurry phone photos), restyled in a green palette.

- `plant-upload.html` → `../plant-upload.png` (upload screen)
- `plant-results.html` → `../plant-results.png` (results screen)
- `plant.css` holds the shared styles; the colors are at the top.

## Re-rendering after an edit

1. Serve the portfolio folder: `python -m http.server 8765 --bind 127.0.0.1`
2. Render each page at 1440×900 with Microsoft Edge (Chrome works the same way):

```bash
"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless=new --hide-scrollbars --window-size=1440,900 --screenshot="assets\projects\plant-upload.png" http://127.0.0.1:8765/assets/projects/mockups/plant-upload.html
```

Repeat with `plant-results` for the second screen. You can also open the page in a browser at 1440×900 and take a screenshot.
