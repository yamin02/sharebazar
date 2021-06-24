const dotenv = require('dotenv');

dotenv.config() ;

module.exports.default = {
    PORT : process.env.PORT || 5000,
    MONGODB_URL : '' ,
    JWT_SECRET: '',
}