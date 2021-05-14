# Postgraphile delete with computed column ORDER demo.

## Dependencies on HOST.

- docker
- docker-compose
- postgresql-client

## Install

To run clone this repository.
In main package of repo run:

```
docker-compose build
docker-compose up
```

You are ready.

## Run

Open [http://localhost:8081/graphiql](http://localhost:8081/graphiql) in web browser

Paste in graphiql

```
mutation MyMutation {
  deleteFooById(input: {id: 3}) {
    fooEdge(orderBy: TEST_HA_DESC) {
      node {
        id
        nodeId
        secondcol
        testHa
        thirdcol
        title
      }
    }
  }
}
```

and click 'Play' button.

Error appears:

```
"Expected SQL item, instead received '({\n        queryBuilder\n      }) => sql.fragment`(${sql.identifier(proc.namespaceName, proc.name)}(${queryBuilder.getTableAlias()}))`'.",
```
