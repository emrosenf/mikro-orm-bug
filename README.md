Install and run

```bash
npm i
npm run start
```

Now execute this GraphQL query from Playground at localhost:4000/graphql
```graphql
# Write your query or mutation here
query {
  me {
    id
    firstName
    tag{
      id
      name
    }
  }
}
```

The first time you run, you will see the following console output

```bash
[query] select `e0`.* from `user` as `e0` where `e0`.`firstName` = 'user-1' limit 1 [took 2 ms]
[query] select `e0`.* from `tag` as `e0` where `e0`.`id` = '1' limit 1 [took 4 ms]
```

You see two queries. Now run the GraphQL query again. You will only see one query.
```bash
[query] select `e0`.* from `user` as `e0` where `e0`.`firstName` = 'user-1' limit 1 [took 2 ms]
```

The `tag` query doesn't happen because it appears to be pulled from the previous `em`.
