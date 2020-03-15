import ApolloClient from 'apollo-boost'

export const apolloClient = new ApolloClient({
  // You should use an absolute URL here
  uri: 'https://localhost:8080/query'
})
