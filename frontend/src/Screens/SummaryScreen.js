import axios from "axios";
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SummaryScreen = () => {
  const { userInfo } = useSelector((state) => state.login);
  const { userInfo: userInfoAuth } = useSelector((state) => state.auth);
  const questions = useSelector((state) => state.questions);
  const { answers } = useSelector((state) => state.answers);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo && !userInfoAuth) {
      navigate("/login");
    }
  }, [userInfo, userInfoAuth]);

  let correctCount = 0;
  questions.map((question) => {
    answers &&
      answers.answeredQuestions.map((answer) => {
        if (
          question._id == answer.questionId &&
          question.correctAnswer == answer.selectedOption
        ) {
          correctCount++;
        }
      });
  });

  return (
    <Container>
      <h4>Summary</h4>
      {questions &&
        questions.map((question) => (
          <>
            <h6>{question.questionText}</h6>
            <p>Correct answer: {question.correctAnswer}</p>
          </>
        ))}
      <br />
      <p>Your answers are:</p>
      {answers &&
        answers.answeredQuestions.map((answer) => (
          <p>{answer.selectedOption}</p>
        ))}
      <br />
      <p>You have <strong>{correctCount}</strong> answers correct out of <strong>4</strong></p>
    </Container>
  );
};

export default SummaryScreen;
