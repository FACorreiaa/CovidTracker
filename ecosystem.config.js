module.exports = {
  apps: [
    {
      name: 'DeployApp',
      script: 'build/main.js',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
