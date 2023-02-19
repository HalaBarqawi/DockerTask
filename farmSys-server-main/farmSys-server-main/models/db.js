const mongoose = require('mongoose');
const mongoUri ='mongodb+srv://asala:asala2001@cluster0.4kqzyzz.mongodb.net/?retryWrites=true&w=majority';
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('our db is connected');
  })
  .catch(err => console.log(err.message));
