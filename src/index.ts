import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import UserResolver from './UserResolver'


import { MikroORM, RequestContext, } from 'mikro-orm';

const main = async () => {

  const orm = await MikroORM.init({
    entitiesDirs: ['src/entities'],
    type: 'sqlite',
    dbName: 'src/dev.db',
    logger: console.log.bind(console),
    debug: true,
  });

  // For debugging purposes, assign an id
  // @ts-ignore
  orm.em.id = 'global'

  const app = express();
  // app.use((req, res, next) => {
  //   console.log('running middleware')
  //   RequestContext.create(orm.em, next);
  //   console.log('middleware end')
  // });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver]
    }),
    context: ({ req, res }) => {
      const em = orm.em.fork()
      // if this line is uncommented, the expected behavior will result
      // this demonstrates that the wrap(entity).__em is picking up the
      // global em instance
      // Alternatively, set a breakpoint at EntityAssigner:10 and examine
      // the 'id' of wrap(element).__em on the second request and you will
      // see it is the 'global' one
      // orm.em.clear()

      // For debugging purposes, assign an id
      // @ts-ignore
      em.id = 'request'
      return {
        req,
        res,
        em,
      }
    }
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("express server started");
  });
}

main().catch(err => console.error(err))
