import { useState } from "react";

import QuizCard from "./QuizCard";
import Modal from "./QuizModal";

type Question = {
  category: string;
  question: string;
  score: number;
};

type BoardProps = {
  quizData: Question[];
};

function QuizBoard({ quizData }: BoardProps) {
  // Group questions by category
  const groupedData = quizData.reduce(
    (acc: { [key: string]: Question[] }, question) => {
      if (!acc[question.category]) {
        acc[question.category] = [];
      }
      acc[question.category].push(question);
      return acc;
    },
    {}
  );

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(groupedData);
  return (
    <>
      <Modal openModal={open} closeModal={handleClose}>
        <p>hello world</p>
      </Modal>
      <button onClick={handleOpen}>open modal</button>
      <div className="quiz-card-grid">
        {Object.keys(groupedData).map((category) => (
          <div key={category} className="quiz-column">
            <h3>{category}</h3>
            <ul className="quiz-column-cards">
              {groupedData[category].map((data, index) => (
                <li key={index}>
                  <QuizCard data={data} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

export default QuizBoard;
