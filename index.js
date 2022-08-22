const express = require('express');
const cookieParser = require('cookie-parser');

require('dotenv').config();
const app = express();
const port = 3000;

//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie middleware
app.use(cookieParser());

const userRouter = require('./routes/userRoutes');

app.use('/api', userRouter);

app.get('/', (req, res) => {
  res.send('Hello from prisma');
});

app.listen(port, () => {
  console.log('Server is running on port 3000');
});
