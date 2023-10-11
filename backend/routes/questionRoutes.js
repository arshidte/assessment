import express from "express";
const router = express.Router();

import asyncHandler from "../middleware/asyncHandler.js";
import Question from "../models/questionModel.js";
import UserQn from "../models/userQnModel.js";

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const questions = await Question.find();
    if (questions) {
      res.json(questions);
    } else {
      res.status(404);
      throw new Error("Resource not found!");
    }
  })
);

router.post(
  "/submit",
  asyncHandler(async (req, res) => {
    const { userId, answers } = req.body;

    const alreadyAnswered = await UserQn.findOne({ userId });

    if (alreadyAnswered) {
      res.status(400);
      throw new Error("User already attended!");
    }

    const saveAns = await UserQn.create({ userId, answeredQuestions: answers });

    if(saveAns){
        res.json({saveAns});
    }

  })
);

export default router;
