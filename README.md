# FONT

.woff2 - with the smallest size and fastest load time is currently the best for web apps.

`display: 'swap'`

- Initial Rendering: The browser immediately displays the text using a fallback font while the custom web font is still loading. This avoids the "invisible text" issue where text is not displayed until the font is fully loaded.
- After Font Loads: Once the custom font has finished loading, the browser swaps the fallback font with the custom font.

Benefits:

- Improves User Experience: Text is visible immediately, even if the custom font takes time to load.
- Prevents FOUT (Flash of Unstyled Text): Users see styled text from the start instead of a blank space.
- Better for SEO: Search engines can read and index the text more effectively if it’s visible immediately.
