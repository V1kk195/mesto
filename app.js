const express = require('express');
const path = require('path');

const users = require('./routes/users');
const cards = require('./routes/cards');
const user = require('./routes/user');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', users);
app.use('/cards', cards);
app.use('/', user);
app.get('*', (req, res) => {
  res.status(404);
  res.send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
