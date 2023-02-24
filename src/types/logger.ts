export type LoggerProperties = {
    level: number,
    time: number,
    pid: number,
    hostname: string,
    msg: string,
    reqId: string,
    req: {
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        url: string,
        hostname: string,
        remoteAddress: string,
        remotePort: number
    } | undefined,
    res: {
        req: {
            method: 'GET' | 'POST' | 'PUT' | 'DELETE',
            url: string
        }
        statusCode: number
    },
    err: {
        type: string,
        message: string,
        stack: Error
    }
}