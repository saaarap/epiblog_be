const express = require("express");
const mongoose = require("mongoose");
const logger = require("./middlewares/logger");
const postsRoute = require("./routes/posts");
const usersRoute = require("./routes/users");
const loginRoute = require("./routes/login");
const githubRoute = require("./routes/github")
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const PORT = 5050;

const app = express();

app.use("/public", express.static(path.join(__dirname, "public")));
//directory accessibile pubblicamente

app.use(cors());
app.use(express.json());
app.use(logger);
// routes
app.use("/", postsRoute);
app.use("/", usersRoute);
app.use("/", loginRoute);
app.use("/", githubRoute)

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// ogni volta che c'è errore in fase di connessione stampa questa stringa
db.on("error", console.error.bind(console, "Error during db connection"));
// una volta che è connesso mostra questa stringa
db.once("open", () => {
  console.log("Database successfully connected!");
});

app.listen(PORT, () => console.log(`Server up running on port ${PORT}`));
