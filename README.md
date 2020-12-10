#Postgraphile subscription demo

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
Open `http://localhost:8081/graphiql` in web browser

Paste in graphiql
```
subscription {
  listen(topic: "hello") {
    relatedNodeId
    relatedNode {
      nodeId
      ... on Foo {
        id
        title
      }
    }
  }
}
```

and click 'Play' button.

In second terminal run run-subscription.sh.
You should see that subscription yielded data in browser.