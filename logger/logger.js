const {format,createLogger, transports} = require('winston')
const { Console } = require('winston/lib/winston/transports')
require('winston-daily-rotate-file')
require('winston-mongodb')

const fileRotateTransport = new transports.DailyRotateFile({
    level:"info",
    filename: "logs/info-%DATE%.log",
    datePattern:"DD-MM-YYYY",
    maxFiles:"10d"
})

const{ combine, timestamp, label, prettyprint } = format

const logger = createLogger({
    level: "debug",
    format: combine(
        label({label: "Winston logs for users Products App"}),
        timestamp({
            format:"DD-MM-YYYY HH:mm:ss"
        }),
        format.json()
        // prettyprint()
    ),
    transports:[
        new transports.Console(),
        // new transports.File({
        //     filename: "logs/example.log"
        // }),
        new transports.File({
            level:"error",
            filename:"logs/error.log"
        }),
        new transports.File({
            level:"info",
            filename:"logs/info.log"
        }),
        fileRotateTransport,
        new transports.MongoDB({
            level:"debug",
            db: process.env.MONGODB_URI,
            collection:"server_logs",
            format:format.combine(
               format.timestamp(),
               format.json() 
            )
        })
    ]
})

module.exports = logger