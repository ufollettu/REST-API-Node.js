const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const middleware = require("../middleware");


const Userr = require("../models/userr.server.model");

router.post("/signup", (req, res, next) => {
    Userr.find({email: req.body.email})
        .exec()
        .then(userr => {
            if (userr.length >= 1) {
                return res.status(409).json({
                    message: "Mail Exists"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({error: err});
                    } else {
                        const userr = new Userr({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        userr.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'Userr created'
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({error: err});
                            });
                    }
                });
            }
        })
});

router.post("/signin", (req, res, next) => {
    Userr.find({email: req.body.email})
        .exec()
        .then(userr => {
            if (userr.length < 1) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            bcrypt.compare(req.body.password, userr[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: userr[0].email,
                            userId: userr[0]._id
                        },
                        "secretKey",
                        {
                            expiresIn: "1h"
                        });
                    return res.status(200).json({
                        message: "Auth success",
                        token: token // token is encoded not encrypted!
                    });
                }
                res.status(401).json({
                    message: "Auth failed"
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.delete("/:userrId", (req, res, next) => {
    Userr.remove({_id: req.params.userrId})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Userr deleted"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

module.exports = router;