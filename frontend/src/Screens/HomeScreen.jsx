import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getQuestions } from "../Slices/questionSlice";
import { postAnswers } from "../Slices/answerSlice";

const HomeScreen = () => {
  // const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  const { userInfo } = useSelector((state) => state.login);
  const { userInfo: userInfoAuth } = useSelector((state) => state.auth);
  const questions = useSelector((state) => state.questions);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo && !userInfoAuth) {
      navigate("/login");
    } else {
      dispatch(getQuestions());
    }
  }, [userInfo, userInfoAuth, dispatch]);

  const handleAnswerSelection = (questionId, answer) => {
    // Create an object representing the answer for the current question
    const answerObject = { questionId, selectedOption: answer };

    // Find and update the existing answer if it exists; otherwise, add the new answer
    const updatedAnswers = [...answers];
    const existingAnswerIndex = updatedAnswers.findIndex(
      (ans) => ans.questionId === questionId
    );
    if (existingAnswerIndex !== -1) {
      updatedAnswers[existingAnswerIndex] = answerObject;
    } else {
      updatedAnswers.push(answerObject);
    }

    setAnswers(updatedAnswers);
  };

  const handleSubmitAnswers = (e) => {
    e.preventDefault();
    let userId;
    if (userInfo != null) {
      userId = userInfo._id;
    } else {
      userId = userInfoAuth._id;
    }
    dispatch(postAnswers({ userId, answers }));
    navigate('/summary');
    // axios
    //   .post("/api/questions/submit", { userId, answers })
    //   .then((response) => {
    //     navigate("/summary");
    //   })
    //   .catch((error) => {
    //     alert("Some error occured. Make sure you are not submitted before!");
    //     console.error("Error submitting answers:", error);
    //   });

  };

  return (
    <>
      <Container>
        <div>
          <h1>Welcome</h1>
          <p>Answer the following questions</p>

          {questions.map((question) => (
            <div key={question._id}>
              <h3>{question.questionText}</h3>
              <ul>
                {question.options.map((option) => (
                  <li key={option}>
                    <input
                      type="radio"
                      name={`question-${question._id}`}
                      value={option}
                      onChange={() =>
                        handleAnswerSelection(question._id, option)
                      }
                    />
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <Button onClick={handleSubmitAnswers}>Submit Answers</Button>
        </div>
      </Container>
    </>
  );
};

export default HomeScreen;
