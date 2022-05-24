import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(resp => resp.json())
      .then(questionsList => setQuestions(questionsList))
  }, [])

  const handleDeleteItem = itemId => {
    fetch(`http://localhost:4000/questions/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        const updatedQuestions = questions.filter(question => question.id !== itemId)
        setQuestions(updatedQuestions)
      })
  }

  const handleEditItem = (newValue, itemId) => {
    fetch(`http://localhost:4000/questions/${itemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({correctIndex: newValue})
    })
      .then(resp => resp.json())
      .then(updatedQuestion => {
        const updatedQuestions = questions.map(question => {
          if(updatedQuestion.id === question.id) {
            return updatedQuestion
          } else {
            return question
          }
        })
        setQuestions(updatedQuestions)
      })
  }

  const questionComponents = questions.map((question, index) => {
    return (
      <QuestionItem 
        key={index} 
        question={question} 
        handleDeleteItem={handleDeleteItem}
        handleEditItem={handleEditItem}
      />
    )
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionComponents}</ul>
    </section>
  );
}

export default QuestionList;
