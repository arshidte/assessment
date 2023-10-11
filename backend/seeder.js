import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import users from "./data/users.js";
import questions from "./data/questions.js";

import User from "./models/userModel.js";
import Question from "./models/questionModel.js";
import UserQn from "./models/userQnModel.js";


dotenv.config();

await connectDB();

const importData = async () => {
  try {
    // await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const createdQuestions = await Question.insertMany(questions);

    const sampleUser = createdUsers[0]._id;
    const sampleQn1 = createdQuestions[0]._id;
    const sampleAn1 = createdQuestions[0].correctAnswer;
    const sampleQn2 = createdQuestions[1]._id;
    const sampleAn2 = createdQuestions[1].correctAnswer;

    const sampleAns = {
      userId: sampleUser,
      answeredQuestions: [
        {
          questionId: sampleQn1,
          selectedOption: sampleAn1,
        },
        {
          questionId: sampleQn2,
          selectedOption: sampleAn2,
        },
      ],
    };

    const createdAns = await UserQn.insertMany(sampleAns);

    console.log("Data imported");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Question.deleteMany();
    await UserQn.deleteMany();

    console.log("Data destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if(process.argv[2] === '-id'){
    destroyData();
}else{
    importData();
}