const express = require("express");
const { APP_PORT } = require("./src/helpers/env");
const webRoute = require("./src/routers/web");

const app = express();
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.static(__dirname + '/public'));

app.use(webRoute);

const PORT = APP_PORT || 300;
app.listen(PORT, () => {
  console.log(`Service running at port ${PORT}`);
});
