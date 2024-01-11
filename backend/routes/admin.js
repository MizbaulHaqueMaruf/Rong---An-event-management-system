const express = require("express");
const bcrypt = require("bcrypt");
const { Admin, validate } = require("../models/admin.js");
const Joi = require("joi");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { error } = req.body;
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const admin = await Admin.findOne({ email: req.body.email });
    if (admin)
      return res
        .status(409)
        .send({ message: "Admin with given email already Exist!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new Admin({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { error } = validateAuth(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      admin.password
    );
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const token = admin.generateAuthToken();
    res.status(200).send({ data: token, message: "logged in successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.log(error);
  }
});

const validateAdmin = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    number: Joi.string().required().label("Number"),
    email: Joi.string().email().required().label("Email"),
    role: Joi.string().required().label("Role"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

const validateAuth = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;
