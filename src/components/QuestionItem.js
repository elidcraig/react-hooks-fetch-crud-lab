import React from "react";

function QuestionItem({ question, handleDeleteItem, handleEditItem }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={(e) => {handleEditItem(e.target.value, id)}}>{options}</select>
      </label>
      <button onClick={() => handleDeleteItem(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
