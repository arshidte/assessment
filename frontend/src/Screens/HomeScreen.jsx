import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const HomeScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  const { userInfo } = useSelector((state) => state.login);
  const { userInfo: userInfoAuth } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo && !userInfoAuth) {
      navigate("/login");
    } else {
      axios
        .get("/api/questions")
        .then((response) => {
          setQuestions(response.data);
        })
        .catch((error) => {
          console.error("Error fetching questions:", error);
        });
    }
  }, [userInfo, userInfoAuth, axios]);

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

  const handleSubmitAnswers = () => {
    let userId;
    if(userInfo != null){
      userId = userInfo._id;
    }else{
      userId = userInfoAuth._id;
    }
    console.log(answers);
    axios
      .post("/api/questions/submit", { userId, answers })
      .then((response) => {
        alert('Submitted successfully');
      })
      .catch((error) => {
        alert('Some error occured. Make sure you are not submitted before!');
        console.error("Error submitting answers:", error);
      });
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
