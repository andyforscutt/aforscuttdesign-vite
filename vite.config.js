import { defineConfig, loadEnv } from "vite";
import { fileURLToPath } from "url";
import path from "path";
// eslint-disable-next-line import/no-unresolved
import handlebars from "vite-plugin-handlebars";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const siteTitle = env.VITE_SITE_TITLE;
  const siteTitleLocation = env.VITE_SITE_TITLE_LOCATION;
  const defaultImage = "about.jpg";
  const phone = env.VITE_PHONE;
  const imgBaseUrl = env.VITE_IMG_BASE_URL || "http://localhost:5173/images";
  const excludeSearch = env.VITE_SEARCH_ENGINES_EXCLUDE === "1";

  return {
    root: path.resolve(__dirname, "pages"), // Your entry HTML files live here
    publicDir: path.resolve(__dirname, "public"),
    plugins: [
      handlebars({
        partialDirectory: path.resolve(__dirname, "partials"),
        partialExtension: ".hbs",
        helpers: {
          eq(a, b, options) {
            return a === b ? options.fn(this) : options.inverse(this);
          },
        },
        context(pagePath) {
          const file = path.basename(pagePath).replace(/\.(hbs|html)$/, "");
          let title;
          let description;
          let image;
          let slider;
          let galleryImages;
          let sliderImages;
          let imageAlt;
          // set variables used in HTML head
          switch (file) {
            default:
              siteTitle;
              description = `${siteTitleLocation}. Phone ${phone}.`;
              image = defaultImage;
              imageAlt = siteTitleLocation;
              slider = true;
              sliderImages = [];
          }

          return {
            title: title || siteTitleLocation,
            siteTitle,
            siteUrl: env.VITE_SITE_URL || "http://localhost:5173",
            facebookUrl: env.VITE_FACEBOOK_URL,
            currentPage: file === "index" ? "" : file,
            description: description || siteTitle,
            image: image || defaultImage,
            imageAlt: imageAlt || siteTitleLocation,
            excludeSearch: excludeSearch || true,
            imgBaseUrl,
            slider: slider ? "slider" : "",
            galleryImages,
            sliderImages,
          };
        },
      }),
    ],
    build: {
      outDir: path.resolve(__dirname, "dist"),
      emptyOutDir: true,
      rollupOptions: {
        input: {
          index: path.resolve(__dirname, "pages/index.html"),
          privacy: path.resolve(__dirname, "pages/privacy-notice.html"),
        },
      },
    },
  };
});
