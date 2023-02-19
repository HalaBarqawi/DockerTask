const express = require('express');
require('dotenv').config();
require('./models/db');
const cors = require('cors')
const bodyParser = require('body-parser')
const userRouter1 = require('./routes/user');
const userRouter = require('./routes/task');
const userRouter2 = require('./routes/harvest');
const userRouter3 = require('./routes/crops');
const generalRoutes = require('./routes/general');
const expenseRoutes = require('./routes/expense');
const salesRoutes = require('./routes/sales')
const User = require('./models/user');
const helmet = require("helmet");
const morgan = require('morgan');

const app = express();
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(userRouter);
app.use(userRouter1);
app.use(userRouter2)
app.use(userRouter3);
app.use(expenseRoutes);
app.use(salesRoutes);

app.use("/general",generalRoutes);
app.get('/test', (req, res) => {
  res.send('Hello world');
});

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Welcome to backend zone!' });
});

app.listen(8000 , () => {
  console.log('port 8000 is listening');
});
