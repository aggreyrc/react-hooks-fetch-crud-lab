import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch(" http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  const handleDelete = (id) => {
    fetch(` http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => {
      const updatedQuestions = questions.filter((question) => question.id !== id);
      setQuestions(updatedQuestions);
    });
  };

  const handleUpdateAnswer = (id, newCorrectIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    }).then(() => {
      const updatedQuestions = questions.map((question) =>
        question.id === id ? { ...question, correctIndex: newCorrectIndex } : question
      );
      setQuestions(updatedQuestions);
    });
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={handleDelete}
            onUpdateAnswer={handleUpdateAnswer}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
