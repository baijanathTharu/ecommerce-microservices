import Fastify from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { registerRoutes } from './app/routes';

const PORT = parseInt(process.env.ORDER_SERVICE_PORT) || 3001;

const server = Fastify({
  ajv: {
    customOptions: {
      strict: 'log',
      keywords: ['kind', 'modifier'],
    },
  },
  logger: {
    level: 'info',
  },
}).withTypeProvider<TypeBoxTypeProvider>();

registerRoutes(server);

server.listen({ port: PORT });
