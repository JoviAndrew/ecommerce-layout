require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userRoute = require('./routers/user_route');
const itemRoute = require('./routers/item_route');
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds149309.mlab.com:49309/e-com-db`);

app.use(express.static('./')); // serve all files in root folder, such as index.html
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'))

app.use('/user', userRoute);
app.use('/item', itemRoute);

// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
      res.status(err.status || 500)
      res.send({
        message: err.message,
        error: err
      })
    })
  }


// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
      message: err.message,
      error: {}
    })
  })

app.listen(3000, () =>{
    console.log('listening on port 3000');
    
})