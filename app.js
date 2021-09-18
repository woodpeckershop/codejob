const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");

//Database
const db = require("./config/database");

//Test DB
db.authenticate()
  .then(() => console.log("database connected"))
  .catch((err) => console.log("Error: " + err));

const app = express();

//handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set("view engine", "handlebars");

// body parser
app.use(bodyParser.urlencoded({ extended: false }));

//set static folder
app.use(express.static(path.join(__dirname, "public")));

// index route
app.get("/", (req, res) => res.render("index", { layout: "landing" }));

//routes
app.use("/jobs", require("./routes/jobs"));

const PORT = process.env.PORT || 7000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
