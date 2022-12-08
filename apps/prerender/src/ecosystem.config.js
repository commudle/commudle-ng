module.exports = {
  apps: [
    {
      name: 'prod-server',
      script: './main.js',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
