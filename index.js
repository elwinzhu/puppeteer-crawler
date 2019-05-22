const config = require('./config');

let instance;
switch (config.config.platform) {
    case config.platforms.liepin:
        console.log('platform is liepin');
        instance = require('./liepin');
        instance();
        break;
    case config.platforms.linkedIn:
        console.log('platform is linkedIn');
        break;
    default:
        console.log('platform is not set');
        break;
}