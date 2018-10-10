const express = require("express");
const authRoutes = express.Router();
const User = require("../models/user");

const bcrypt = require("bcryptjs");
const bcryptSalt = 10;

authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

authRoutes.post("/signup", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = User({
        username,
        password: hashPass
    });

    if (username === '' || password === '') {
        res.render("auth/signup", {
            errorMessage: "Username and Password Required"
        });
        return;
    }

    newUser.save()
    .then(user => {
        res.redirect("/");
    })
});

module.exports = authRoutes;