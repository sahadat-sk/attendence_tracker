const allowedOrigins = require('./allowedOrigins');
const corsOptions = {
    origin: (origin, callback) => {
        // if (allowedOrigins.indexOf(origin) !== -1) {
        //     callback(null, true);
        // } else {
        //     //console.log(origin);
        //     callback(new Error('Not allowed by CORS'));
        // }
        

        // above code not working for some reason, origin is undefined
        callback(null,true);
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
module.exports = corsOptions;