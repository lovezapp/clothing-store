# Advanced React and Graph QL

- Use `next/router` to do imperative routing
- Next.js has solved the FOUC problem two ways: getInitalProps and Custom Document
- V8 is Google’s open source high-performance JavaScript and WebAssembly engine, written in C++. Node.js sits on V8.
- A RESTful API is one that the server or client has no idea of the state of each other. By using a REST interface, different clients hit the same REST endpoints, perform the same actions, and receive the same responses without minding the state of each other.
- Side Effects: when you reach outside of something (function) to generate data. Usually a bad thing, but in Next.js, you can use them when necessary. Like updating the Meta component from the SingleItem component (video 21).
- Pagination - modifying a Query in the schema to filter data (video 23)
- Add the "prefetch" attribute to Next.js's <Link> tag to fetch the previous and next page data

## GraphQL

- spec built to implement both a server and be able to fetch that data from the client
- single endpoint, which is different from other REST APIs; one request to pull in the minimal data -- similar to prototypal inheritance vs class inheritance.
- strictly typed
- Queries - pulling data
- Mutations - putting / updating data
- GraphQL Yoga is a Middleware that uses Express -- it's built on top of Express and Apollo server
  - Middleware is anything you want to do between the REQ and RES in Node.
- Database calls go inside of resolvers
- How to add data to the database -- video 14
- Any time you change what your data model looks like, you MUST deploy it to Prisma
- Prisma creates the fuzzy matching and filtering like a query language because GraphQL is NOT a query language
- our API for the Prisma database is everything inside of `prisma.qraphql`
- SPREAD OPERATOR: all of the data from said object stored in another variable or object. e.g., `data: {...args}` is same as `data: {args.title, args.description}`
- Enum: a list of preset options of a possible type (very helpful in GraphQL)
- ANY TIME YOU EDIT YOUR DATA MODEL YOU MUST REDEPLOY
- When you add something to your schema that is a mutation or a query, you MUST add a corresponding resolver

### GraphQL Files

1. datamodel.graphql: for Prisma; for our back end
2. prisma.graphql: what gets generated based off of datamodel.graphql
3. schema.graphql: public facing API and what we interface with using JavaScript

## Apollo Client

- Replaces the need for Redux (it actually uses Redux under the hood)
- does all the data management stuff that Redux did
- The only child of a Query / Mutation component _must_ be a function
  `<Query> { () => null } </Query>`
- exposes a "loading" and "error" object to its components
