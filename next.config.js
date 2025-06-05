// next.config.js
const isGithubPages = process.env.NODE_ENV === 'production';

module.exports = {
  output: 'export',
  basePath: isGithubPages ? '/your-repo-name' : '',
  assetPrefix: isGithubPages ? '/your-repo-name/' : '',
};
