const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const data = require('./data');

app.get('/', (req, res) => {
  res.send('<h1>Welcome to our schedule website</h1>');
});

app.get('/users', (req, res) => {
  res.send(data.users);
});

app.get('/schedules', (req, res) => {
  res.send(data.schedules);
});

app.get('/users/:id', (req, res) => {
  res.send(data.users[req.params.id]);
});

app.get('/users/:id/schedules', (req, res) => {
  res.send(
    data.schedules.filter((userSchedule) => {
      return userSchedule.user_id === Number(req.params.id);
    })
  );
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
