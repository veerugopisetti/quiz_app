import { useState } from "react";
import { data } from "./data.js";

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [answers, setAnswers] = useState(() => Array(data.length).fill(null));

  const selectedAnswer = answers[index];
  const score = answers.reduce(
    (total, answer, questionIndex) =>
      total + (answer === data[questionIndex].ans ? 1 : 0),
    0,
  );

  const checkAnswer = (ans) => {
    if (selectedAnswer !== null) return;

    setAnswers((currentAnswers) => {
      const updatedAnswers = [...currentAnswers];
      updatedAnswers[index] = ans;
      return updatedAnswers;
    });
  };

  const nextQuestion = () => {
  if (index < data.length - 1) {
    const nextIndex = index + 1;

    setIndex(nextIndex);
    setQuestion(data[nextIndex]);
  }
};

const prevQuestion = () => {
  if (index > 0) {
    const prevIndex = index - 1;

    setIndex(prevIndex);
    setQuestion(data[prevIndex]);
  }
};

  const getOptionClass = (optionNumber) => {
    if (selectedAnswer === null) return "";
    if (optionNumber === question.ans) return "correct";
    if (optionNumber === selectedAnswer) return "wrong";
    return "";
  };


  return (
    <div className="container">
      <h1>Quiz App</h1>

      <h2>
        {index + 1}. {question.question}
      </h2>

      <ul>
        <li className={getOptionClass(1)} onClick={() => checkAnswer(1)}>{question.option1}</li>
        <li className={getOptionClass(2)} onClick={() => checkAnswer(2)}>{question.option2}</li>
        <li className={getOptionClass(3)} onClick={() => checkAnswer(3)}>{question.option3}</li>
        <li className={getOptionClass(4)} onClick={() => checkAnswer(4)}>{question.option4}</li>
      </ul>
      <div className="btn">
        <button onClick={prevQuestion}>previous</button>
      <button onClick={nextQuestion}>Next</button>
        </div>

      <div className="index">
        {index + 1} of {data.length} questions
      </div>
      <div> your secured score is:{score}</div>
    </div>
  );
};

export default Quiz;
