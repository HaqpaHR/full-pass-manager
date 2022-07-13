import { Router, Request, Response } from "express";
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

router.post("/add", async (req: Request, res: Response) => {
  try {
    const {name, password, id} = req.body

    const pass = await new Passwords({name, user: id, password})

    await pass.save()

    res.json(pass)
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
});

router.get("/", authMiddleware, async (req: Request, res: Response) => {

  try {
    const passwords = await Passwords.find({user: req.query.userId})
    return res.json(passwords)
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
});

router.delete("/delete", authMiddleware, async (req: Request, res: Response) => {
  try {
    const password = await Passwords.findOneAndDelete({_id: req.query[0]})
    return res.json(password)
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
});

router.post("/edit", authMiddleware, async (req: Request, res: Response) => {
  try {
    const passwords = await Passwords.findOneAndUpdate({_id: req.body.id}, {name: req.body.name, password: req.body.password})
    return res.json(passwords)
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
});

export default router;
