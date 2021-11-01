const express = require('express');
const app = express();
const morgan = require('morgan');
const port = process.env.PORT || 3000;
const db = require('./database');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  db.any('SELECT * FROM schedule;')
    .then((schedules) => {
      res.render('pages/index', {
        schedules,
        daysOfWeek: {
          '1': 'Monday',
          '2': 'Tuesday',
          '3': 'Wednesday',
          '4': 'Thursday',
          '5': 'Friday',
          '6': 'Saturday',
          '7': 'Sunday',
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.end(err);
    });
});

app.get('/new', (req, res) => {
  db.any('SELECT username FROM schedule;')
    .then((username) => {
      res.render('pages/new-schedule', {
        username,
        days: [1, 2, 3, 4, 5, 6, 7],
        start: [
          '6:00',
          '7:00',
          '8:00',
          '9:00',
          '10:00',
          '11:00',
          '12:00',
          '13:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
        ],
        end: [
          '6:00',
          '7:00',
          '8:00',
          '9:00',
          '10:00',
          '11:00',
          '12:00',
          '13:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
        ],
      });
    })
    .catch((err) => {
      console.log(err);
      res.end();
    });
});

app.post('/new', (req, res) => {
  const { username, day, start_time, end_time } = req.body;
  console.log(req.body);
  db.none(
    'INSERT INTO schedule (username, day, start_time, end_time) VALUES ($1, $2, $3, $4)',
    [username, day, start_time, end_time]
  )
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
      res.end();
    });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
