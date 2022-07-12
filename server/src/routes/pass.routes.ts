import { Router } from "express";
import Passwords from "../models/Passwords";
import authMiddleware from "../middleware/auth.middleware";
import { check, validationResult } from "express-validator";
import User from "../models/User";
import bcrypt from "bcryptjs";
import user from "../models/User";
import jwt from "jsonwebtoken";
import config from "config";
import passwords from "../models/Passwords";

const router = Router();

router.post("/add", async (req: any, res: any) => {
  try {
    const {name, password, id} = req.body
    // console.log(name, password, id)

    const pass = await new Passwords({name, user: id, password})

    await pass.save()

    res.json(pass)
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
});

router.get("/", authMiddleware, async (req: any, res: any) => {
  try {
    const passwords = await Passwords.find({user: req.user.id})
    return res.json(passwords)
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
});

router.delete("/delete", authMiddleware, async (req: any, res: any) => {
  try {
    const password = await Passwords.findOneAndDelete({_id: req.query[0]})
    return res.json(password)
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
});

router.post("/edit", authMiddleware, async (req: any, res: any) => {
  try {
    console.log(req.body)
    const passwords = await Passwords.findOneAndUpdate({_id: req.body.id}, {name: req.body.name, password: req.body.password})
    console.log(passwords)
    return res.json(passwords)
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
});

export default router;
