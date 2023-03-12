"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const pino_pretty_1 = __importDefault(require("pino-pretty"));
const chalk_1 = __importDefault(require("chalk"));
const strings_1 = require("./strings");
const chalk = new chalk_1.default.Instance({ level: 2 });
const methods = {
    'GET': chalk.greenBright,
    'POST': chalk.cyanBright,
    'PUT': chalk.blueBright,
    'DELETE': chalk.redBright
};
const levels = {
    trace: chalk.blueBright('|    DEBUG'),
    debug: chalk.blueBright('|    DEBUG'),
    info: chalk.greenBright('|     INFO'),
    warn: chalk.yellowBright('|  WARNING'),
    error: chalk.redBright('|    ERROR'),
    fatal: chalk.magentaBright('| CRITICAL'),
};
const stream = (0, pino_pretty_1.default)({
    colorize: true,
    ignore: 'pid,hostname,reqId,req,res,responseTime,err',
    translateTime: "UTC:dd/mm/yyyy'-'HH:MM:ss",
    customPrettifiers: {
        time: timestamp => chalk.grey(timestamp),
        level: level => `${levels[level]}`
    },
    messageFormat: (dates) => {
        let { level, time, pid, hostname, msg, reqId, req, res, err } = dates;
        const log = chalk.whiteBright;
        (0, strings_1.detectUrl)(msg, ((url, isUrl) => isUrl ? url === null || url === void 0 ? void 0 : url.forEach((u) => msg = msg.replace(u, chalk.cyanBright(u))) : url));
        (0, strings_1.detectIp)(msg, ((ip, isIp) => isIp ? ip === null || ip === void 0 ? void 0 : ip.forEach((u) => msg = msg.replace(u, chalk.cyanBright(u))) : ip));
        if (reqId) {
            const id = chalk.hex("#CE57FD")(`#${reqId.slice(4)}`);
            if (req) {
                if (err) {
                    return log(`${id} ${chalk.redBright(err.message)} \n ${chalk.gray(err.stack)}`);
                }
                return log(`${id} ${chalk.yellow(`<=${req.method}`)}:${chalk.greenBright(req.url)} request from IP ${chalk.cyanBright(req.remoteAddress)}`);
            }
            else if (res) {
                return log(`${id} ${chalk.yellow(`=>${res.req.method}`)}:${chalk.greenBright(res.req.url)} response with a ${chalk.hex('#CE57FD')(res.statusCode)}-status`);
            }
            else {
                return log(`${id} ${msg}`);
            }
        }
        return log(`${(0, strings_1.upperCaseFirstLetter)(msg)} ${(req === null || req === void 0 ? void 0 : req.method) && (req === null || req === void 0 ? void 0 : req.url) ? chalk.white(`[${methods[req.method](req.method)} - ${req.url}]`) : ''} ${reqId ? `- ${chalk.white(`ID=${reqId}`)}` : ''}`);
    }
});
const logger = (0, pino_1.default)({
    serializers: {
        res(reply) {
            return {
                statusCode: reply.statusCode,
                req: reply.raw.req,
            };
        },
        req(request) {
            return {
                method: request.method,
                url: request.url,
                hostname: request.hostname,
                remoteAddress: request.raw.connection.remoteAddress,
                remotePort: request.socket.remotePort,
            };
        }
    },
    formatters: {
        level: (label) => {
            return { level: label };
        },
    }
}, stream);
exports.default = logger;
