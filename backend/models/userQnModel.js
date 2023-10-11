import mongoose from "mongoose";

const userQnSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  answeredQuestions: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
      },
      selectedOption: {
        type: String,
      },
    },
  ],
});

const UserQn = mongoose.model('UserQn', userQnSchema);

export default UserQn;