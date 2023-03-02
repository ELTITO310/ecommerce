import pino from 'pino';
import pretty from 'pino-pretty';
import Chalk from 'chalk'
import { getReasonPhrase } from 'http-status-codes'

import { detectUrl, detectIp, upperCaseFirstLetter } from './strings';
import { LoggerProperties } from '../types/logger'

const chalk = new Chalk.Instance({ level: 2 })

const methods = {
    'GET': chalk.greenBright,
    'POST':  chalk.cyanBright,
    'PUT': chalk.blueBright,
    'DELETE': chalk.redBright
}

const levels = {
    trace: chalk.blueBright   ('|    DEBUG'),
    debug: chalk.blueBright   ('|    DEBUG'),
    info:  chalk.greenBright  ('|     INFO'),
    warn:  chalk.yellowBright ('|  WARNING'),
    error: chalk.redBright    ('|    ERROR'),
    fatal: chalk.magentaBright('| CRITICAL'), 
}

const stream = pretty({
    colorize: true,
    ignore: 'pid,hostname,reqId,req,res,responseTime,err',
    translateTime: "UTC:dd/mm/yyyy'-'HH:MM:ss",
    customPrettifiers: {
        time: timestamp => chalk.grey(timestamp),
        level: level => `${levels[(level as 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal')]}`
    },
    messageFormat: (dates) => {
        let { level, time, pid, hostname, msg, reqId, req, res, err } = (dates as LoggerProperties)                
        const log = chalk.whiteBright
        detectUrl(msg, ((url, isUrl) => isUrl ? url?.forEach((u) => msg = msg.replace(u, chalk.cyanBright(u))) : url))
        detectIp(msg, ((ip, isIp) => isIp ? ip?.forEach((u) => msg = msg.replace(u, chalk.cyanBright(u))) : ip))
        if(reqId) {
            const id = chalk.hex("#CE57FD")(`#${reqId.slice(4)}`)
            if(req) {
                if(err) {
                    return log(`${id} ${chalk.redBright(err.message)} \n ${chalk.gray(err.stack)}`)
                }
                return log(`${id} ${chalk.yellow(`<=${req.method}`)}:${chalk.greenBright(req.url)} request from IP ${chalk.cyanBright(req.remoteAddress)}`)
            } else if(res) {
                return log(`${id} ${chalk.yellow(`=>${res.req.method}`)}:${chalk.greenBright(res.req.url)} response with a ${chalk.hex('#CE57FD')(res.statusCode)}-status`)
            } else {
                return log(`${id} ${msg}`)
            }
        }
        return log(`${upperCaseFirstLetter(msg)} ${req?.method && req?.url ? chalk.white(`[${methods[req.method](req.method)} - ${req.url}]`) : ''} ${reqId ? `- ${chalk.white(`ID=${reqId}`)}` : ''}`)
    }

})
const logger = pino({ 
    serializers: {
        res (reply) {
            return  {
                statusCode: reply.statusCode,
                req: reply.raw.req,
            }  
        },
        req (request) {
            return {
              method: request.method,
              url: request.url,
              hostname: request.hostname,
              remoteAddress: request.raw.connection.remoteAddress,
              remotePort: request.socket.remotePort,
            }
          }
    },
    formatters: {
    level: (label) => {
        return { level: label }
    },
} }, stream)

export default logger;