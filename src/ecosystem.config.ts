module.exports = {
  apps: [
    {
      name: 'DeployApp',
      script: './main.js', // path needs to be relative from ecosystem.config.js
      watch: true, // any changes to app folder will get pm2 to restart app
      env: {
        NODE_ENV: 'producttion', // define env variables here
      },
    },
  ],
};
