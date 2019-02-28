const path = require('path');

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    devServer: {
        proxy:  process.env.API_HOST //'https://rent-room-api.herokuapp.com'
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src/')
            }
        }
    }
};
