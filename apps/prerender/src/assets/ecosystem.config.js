module.exports = {
  apps: [
    {
      name: 'prod-server',
      script: './index.js',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
