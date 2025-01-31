import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/FunGame.css";

const FunGame = () => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("User");

  useEffect(() => {
    // Fetching quiz questions from backend
    axios.get("http://127.0.0.1:5000/get-questions")
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the questions", error);
      });
  }, []);

  const handleAnswerSubmit = () => {
    const currentQ = questions[currentQuestion];
    axios.post("http://127.0.0.1:5000/check-answer", {
      question_id: currentQ.id,
      answer: answer
    })
    .then((response) => {
      if (response.data.correct) {
        setScore(score + 10);
        setMessage("Correct Answer!");
      } else {
        setMessage("Wrong Answer!");
      }

      // Move to the next question or finish
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setMessage(`Game Over! Your final score is ${score + 10}`);
        // Submit score
        axios.post("http://127.0.0.1:5000/submit-score", { username, score: score + 10 });
      }
    })
    .catch((error) => {
      console.error("Error checking the answer", error);
      setMessage("Error checking the answer!");
    });
  };

  return (
    <div className="game-container">
      <h1 className="game-title">🎮 Fun Game</h1>
      <p className="score">Score: {score}</p>

      <div className="question-container">
        <p className="question">{questions[currentQuestion]?.question}</p>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="answer-input"
          placeholder="Enter your answer"
        />
        <button onClick={handleAnswerSubmit} className="submit-btn">Submit Answer</button>
      </div>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default FunGame;
