# Entity Registration

In this repo we try to show off how a master reference data solution could look like.

The idea is that we capture reference data of an enterpise in entities and instances of those entities.
Another way to say this, first create a description of an asset of your enterprise then do an inventarisation of all assets that match that description.

By doing this, you will get an overview of relevant assets within a coorperation.

## Current State

The current state is that the entity creation, modification and finding of entities is available.

## Future State

- Add instances of instances
- Modification of instances
- Lookup of instances

- Introduce Domains
- Introduce Traits

- Introduce connectors to talk to other systems
- Similarly, create connectors that listen to other systems
- Determine location of deployment k8s or cloud native
  - If k8s
    - Seperate backend and frontend further
  - If cloud
    - Adapt current architecture to suitable cloud vendors

## Dev

### Start up

docker-compose up and start working :)

### Architecture

Current architecture is based around a nosql database and nextjs which is mainly used as a frontend and provides some backend functionality. Using API and getServerSideProps. Nextjs provides some functionality to do treeshaking such that the sensitive parts of the application will not be exposed. However, it needs to be seen if not a decent back-end needs to be created.
