const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sendMessage } = require('./kafka/producer');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const server = new ApolloServer({ typeDefs, resolvers });
server.start().then(() => {
  app.use(expressMiddleware(server));
});

app.get('/movies', resolvers.Query.movies);
app.get('/movies/:id', (req, res) => {
  resolvers.Query.movie(null, { id: req.params.id }).then(movie => res.json(movie));
});
app.post('/movies', async (req, res) => {
  await sendMessage('movies_topic', req.body);
  res.send({ message: 'Movie created', data: req.body });
});

app.get('/tvshows', resolvers.Query.tvShows);
app.get('/tvshows/:id', (req, res) => {
  resolvers.Query.tvShow(null, { id: req.params.id }).then(tvShow => res.json(tvShow));
});
app.post('/tvshows', async (req, res) => {
  await sendMessage('tvshows_topic', req.body);
  res.send({ message: 'TV Show created', data: req.body });
});

app.listen(3000, () => {
  console.log('API Gateway running on port 3000');
});
