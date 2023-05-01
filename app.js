const express = require('express');
const app = express();
const routes = require('./routes');
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);
app.listen(process.env.PORT, () => {
  console.log('listening on port ' + process.env.PORT);
});
