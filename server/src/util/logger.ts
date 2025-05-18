import winston, { format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const loggerConfig = {
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.cli()
    ),
    transports: [
        new winston.transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        }),
        new DailyRotateFile({
            filename: 'logs/error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            level: 'error'
        }),
        new DailyRotateFile({
            filename: 'logs/combined-%DATE%.log',
            datePattern: 'YYYY-MM-DD'
        })
    ]
}

export const logger = winston.createLogger(loggerConfig);