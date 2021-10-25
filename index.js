const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const morgan = require('morgan');
const port = process.env.PORT || 3000;
const data = require('./data');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(morgan('dev'));

const { users, schedules } = data;

app.get('/', (req, res) => {
  res.render('pages/index');
});

app.get('/users', (req, res) => {
  res.render('pages/users', {
    users: users,
  });
});

app.get('/schedules', (req, res) => {
  res.render('pages/schedules', {
    schedules: schedules,
  });
});

app.get('/users/:id', (req, res) => {
  if (req.params.id === 'new') {
    res.render('pages/new-user');
  } else {
    const idFilteredUser = [data.users[req.params.id]];
    if (idFilteredUser.includes(undefined)) {
      res.render('pages/errors', {
        message: 'User not found',
      });
    } else {
      res.render('pages/users', {
        users: idFilteredUser,
      });
    }
  }
});

app.get('/users/:id/schedules', (req, res) => {
  const idFilteredSchedules = data.schedules.filter((userSchedule) => {
    return userSchedule.user_id === Number(req.params.id);
  });
  if (idFilteredSchedules.length === 0) {
    res.render('pages/errors', {
      message: 'No schedule found for the requested user',
    });
  }

  res.render('pages/schedules', {
    schedules: idFilteredSchedules,
  });
});

app.get('/schedules/new', (req, res) => {
  res.render('pages/new-schedule', {
    users: users,
    days: [1, 2, 3, 4, 5, 6, 7],
    start: [
      '6AM',
      '7AM',
      '8AM',
      '9AM',
      '10AM',
      '11AM',
      '12PM',
      '1PM',
      '2PM',
      '3PM',
      '4PM',
      '5PM',
    ],
    end: [
      '6AM',
      '7AM',
      '8AM',
      '9AM',
      '10AM',
      '11AM',
      '12PM',
      '1PM',
      '2PM',
      '3PM',
      '4PM',
      '5PM',
    ],
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/schedules', (req, res) => {
  data.schedules.push({
    user_id: req.body.userName,
    day: req.body.day,
    start_at: req.body.start_at,
    end_at: req.body.end_at,
  });
  res.redirect('/schedules');
});

app.post('/users', (req, res) => {
  const { password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  // req.body.password = hash;
  data.users.push({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: hash,
  });
  res.redirect('/users');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
