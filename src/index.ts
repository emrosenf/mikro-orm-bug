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
      return {
        req,
        res,
        em: orm.em.fork(),
      }
    }
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("express server started");
  });
}

main().catch(err => console.error(err))
