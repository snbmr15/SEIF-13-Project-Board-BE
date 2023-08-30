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
const friendsRouter = require('./routers/friends_router');
const notesRouter = require('./routers/notes_router');
const searchbarRouter = require('./routers/searchbar_router');
const taskCategoriesRouter = require('./routers/taskCat_router');
const projectRouter = require('./routers/project_router');

app.use('/users', userRouter)
app.use('/tasks', taskRouter)
app.use('/friends', friendsRouter)
app.use('/notes', notesRouter)
app.use('/search', searchbarRouter)
app.use('/taskCat', taskCategoriesRouter)
app.use('/project', projectRouter)


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




/*

// const mainRouter = require('./routers/router');
// app.use(mainRouter);

// dotenv.config({ path: './config.env' });
// require('./database/dbConnection'); 
// app.use("/uploads",express.static('uploads'));


// server
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
})

// socket.io
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000", // FE website
  },
});


io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setUser", (userProfile) => {
    socket.join(userProfile.id);
    socket.emit("User Connected");
  });

  socket.on("joinSelectedChat", (chat) => {
    socket.join(chat);
    console.log("User Joined Room: " + chat);
  });


  socket.on("sendingMessage", (data) => {
    let receivedMessage = data.newMessage;
    let currentChat = data.getChat;

    currentChat.users.forEach((user) => {
      socket.to(user).emit("messageRecieved", receivedMessage);
    });


  });

  socket.off("setUser", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userProfile.id);
  });
});

*/