import Fastify from 'fastify';

const PORT = parseInt(process.env.ORDER_SERVICE_PORT) || 3001;

const fastify = Fastify({
  logger: {
    level: 'info',
  },
});

fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: PORT });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
