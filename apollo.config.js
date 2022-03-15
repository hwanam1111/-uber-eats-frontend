module.exports = {
  client: {
    tagName: "gql",
    includes: ['./src/**/*.{tsx,ts}'],
    service: {
      name: 'uber-eats-backend',
      url: 'http://127.0.0.1:4000/graphql'
    }
  }
}