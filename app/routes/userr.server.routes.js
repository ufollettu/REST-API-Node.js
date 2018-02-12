const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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