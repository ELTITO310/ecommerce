"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const swagger_themes_1 = require("swagger-themes");
const users_schema_1 = require("../routes/users/users.schema");
const swaggePlugin = (0, fastify_plugin_1.default)(async (server, opts) => {
    const theme = new swagger_themes_1.SwaggerTheme('v2');
    const content = theme.getBuffer('dark');
    server.register(swagger_1.default, {
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
                User: users_schema_1.User,
            },
            securityDefinitions: {
                apiKey: {
                    type: 'apiKey',
                    name: 'Authorization',
                    in: 'header'
                }
            }
        }
    });
    server.register(swagger_ui_1.default, {
        prefix: '/docs',
        theme: {
            css: [
                { filename: 'theme.css', content: content }
            ],
            js: [],
            favicon: []
        },
        uiConfig: {}
    });
});
exports.default = swaggePlugin;
