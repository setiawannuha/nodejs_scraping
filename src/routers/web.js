const express = require("express");
const route = express.Router();
const { all, detail, A, B } = require("../controllers/student.controller");

route
.get("/", all)
.get("/detail/:id", detail)
.get("/A", A)
.get("/B", B);

module.exports = route;
