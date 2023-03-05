import fp from 'fastify-plugin'
import { FastifyPluginAsync } from 'fastify'
import swagger from '@fastify/swagger'
import swaggerui from '@fastify/swagger-ui'
import { SwaggerTheme } from 'swagger-themes'

import { User, UserLogin } from '../routes/users/users.schema'

const swaggePlugin: FastifyPluginAsync = fp(async (server, opts) => {
    
    const theme = new SwaggerTheme('v2')
    const content = theme.getBuffer('dark')

    server.register(swagger, {
        swagger: {
            info: {
                title: 'Ecommerce API',
                description: 'The ecommerce API and tester API',
                version: '0.1.0'
            },
            host: 'localhost',
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json'],
            tags: [
                { name: 'user', description: 'User related end-points' },
                { name: 'products', description: 'Products related end-points' }
            ],
            definitions: {
                User,
            },
            securityDefinitions: {
                apiKey: {
                  type: 'apiKey',
                  name: 'Authorization',
                  in: 'header'
                }
            }
        }
    })

    server.register(swaggerui, {
        prefix: '/docs',
        theme: {
            css: [
              { filename: 'theme.css', content: content }
            ],
            js: [],
            favicon: []
        },
        uiConfig: {}
    })

})

export default swaggePlugin