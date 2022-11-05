const env = process.env;

const config = {
  api: { 
    host: env.REACT_APP_API_HOST || 'localhost:3007',
    protocol: env.REACT_APP_API_PROTOCOL || 'http',
  },
};

module.exports = config;
