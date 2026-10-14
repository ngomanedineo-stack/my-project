Buenos Aires (Collletttivo) is not bundled: add the files here, then rebuild.

Expected names (woff2 preferred, otf also accepted):
  BuenosAires-Regular.woff2   (or .otf)   -> used for weights 100-500 (body text)
  BuenosAires-Bold.woff2      (or .otf)   -> used for weights 600-900 (headlines)

If the font has only one style, copy that file to both names.
Convert .otf/.ttf to .woff2 with e.g. https://cloudconvert.com/otf-to-woff2 or `woff2_compress`.
Check the font's licence for web use before publishing.

After adding files, tune headline spacing in app/globals.css (.display: letter-spacing / line-height),
which were tuned for Bricolage Grotesque.
