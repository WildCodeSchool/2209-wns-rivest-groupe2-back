import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core";
import fetch from "cross-fetch";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://127.0.0.1:5000/",
    fetch,
  }),
  cache: new InMemoryCache(),
});

export default client;
