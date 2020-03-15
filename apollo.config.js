module.exports = {
    client: {
      service: {
        name: 'my-app',
        // URL to the GraphQL API
        url: 'http://localhost:8080/query',
      },
      // Files processed by the extension
      includes: [
        'ts/**/*.vue',
        'ts/**/*.js',
        'ts/**/*.ts',
      ],
    },
}