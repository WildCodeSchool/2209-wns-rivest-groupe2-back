import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core";
import fetch from "cross-fetch";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://backend:5000/",
    fetch,
  }),
  cache: new InMemoryCache(),
});

export default client;
