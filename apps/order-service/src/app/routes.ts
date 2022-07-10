import { Type, Static } from '@sinclair/typebox';
import {
  FastifyInstance,
  FastifyLoggerInstance,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

type FastifyTypebox = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FastifyLoggerInstance,
  TypeBoxTypeProvider
>;

export const User = Type.Object({
  name: Type.String(),
  mail: Type.Optional(Type.String({ format: 'email' })),
});

export type UserType = Static<typeof User>;

export function registerRoutes(fastify: FastifyTypebox): void {
  fastify.post(
    '/user',
    {
      schema: {
        body: User,
        response: {
          200: User,
        },
      },
    },
    (request, reply) => {
      // The `name` and `mail` types are automatically inferred
      const { name, mail } = request.body;
      reply.status(200).send({ name, mail });
    }
  );
}
