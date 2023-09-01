require("dotenv").config();
const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const cors = require('cors');
const methodOverride = require('method-override');


// Middleware setup
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'))

// applies a middleware
app.use(cors({
  origin: '*'
}))

// handle cors pre-flight requests
app.options('*', cors())


// Routes
const userRouter = require('./routers/user_router');
const taskRouter = require('./routers/task_router');
const notesRouter = require('./routers/notes_router');
const taskCategoriesRouter = require('./routers/taskCat_router');

app.use('/users', userRouter)
app.use('/tasks', taskRouter)
app.use('/notes', notesRouter)
app.use('/taskCat', taskCategoriesRouter)


// mongoose DB
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const DB = process.env.DATABASE;

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');

  const PORT = process.env.PORT || 8080;
  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

}).catch((err) => {
  console.log('Error connecting to MongoDB:', err);
});



///////////////////// For further improvements ////////////////////
// const friendsRouter = require('./routers/friends_router');
// const searchbarRouter = require('./routers/searchbar_router');
// const projectRouter = require('./routers/project_router');
// app.use('/project', projectRouter)
// app.use('/search', searchbarRouter)
// app.use('/friends', friendsRouter)