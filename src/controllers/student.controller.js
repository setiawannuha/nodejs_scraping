const getDetailStudent = require("../helpers/getDetailStudent");
const getAllStudents = require("../helpers/getAllStudents");
module.exports = {
  all: (req, res) => {
    res.render("all.ejs");
  },
  detail: (req, res) => {
    const id = req.params.id;
    getDetailStudent(id)
      .then((response) => {
        res.render("detail.ejs", {
          data: response,
        });
      })
      .catch((err) => {
        res.render("error.ejs", {
          data: err.message,
        });
      });
  },
  A: (req, res) => {
    getAllStudents()
      .then((result) => {
        res.render("A.ejs", {
          data: result,
        });
      })
      .catch((err) => {
        res.render("error.ejs", {
          data: err.message,
        });
      });
  },
  B: (req, res) => {
    getAllStudents()
      .then((result) => {
        res.render("B.ejs", {
          data: result,
        });
      })
      .catch((err) => {
        res.render("error.ejs", {
          data: err.message,
        });
      });
  },
};
