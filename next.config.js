/** @type {import('next').NextConfig} */
const repoName = 'AspireUS'; // <- Change this to match your GitHub repo name

const nextConfig = {
  output: 'export', // Export static HTML
  trailingSlash: true, // Ensures each page has its own folder with index.html

  images: {
    unoptimized: true, // Disable Image Optimization (which requires a server)
  },

  basePath: `/${repoName}`, // Base path for assets and routes
  assetPrefix: `/${repoName}/docs/`, // Ensures static assets are found correctly
};

module.exports = nextConfig;
