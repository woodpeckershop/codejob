const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Job = require("../models/Jobs");

const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

//get job list
router.get("/", (req, res) =>
  Job.findAll()
    .then((jobs) => {
      // res.send(jobs)
      res.render("jobs", { jobs });
    })
    .catch((err) => console.log(err))
);
//display form
router.get("/add", (req, res) => res.render("add"));

//add a job
router.post("/add", (req, res) => {
  let { title, technologies, budget, description, contact } = req.body;
  let errors = [];
  if (!title) {
    errors.push({ text: "please add a title" });
  }
  if (!technologies) {
    errors.push({ text: "please add some tech" });
  }
  if (!description) {
    errors.push({ text: "please add a desc" });
  }
  if (!contact) {
    errors.push({ text: "please add a contact" });
  }

  //check for errors
  if (errors.length > 0) {
    res.render("add", {
      errors,
      title,
      technologies,
      budget,
      description,
      contact,
    });
  } else {
    if (!budget) {
      budget = "Not set";
    } else {
      budget = `${budget}`;
    }
    //make lower case and remove space for comma
    technologies = technologies.toLowerCase().replace(/,/g, ",");
    // insert into table
    Job.create({
      title,
      technologies,
      budget,
      description,
      contact,
    })
      .then((job) => res.redirect("/jobs"))
      .catch((err) => console.log(err));
  }
});

//search jobs
router.get("/search", (req, res) => {
  let { term } = req.query;
  term = term.toLowerCase();
  Job.findAll({ where: { technologies: { [Op.like]: "%" + term + "%" } } })
    .then((jobs) => res.render("jobs", { jobs }))
    .catch((err) => console.log(err));
});

module.exports = router;
