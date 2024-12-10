import QuizCard from "./QuizCard";
import TeamList from "./TeamList";
import React, { useEffect, useState } from "react";
type Question = {
  category: string;
  question: string;
  score: number;
};

type BoardProps = {
  quizData: Question[];
};

type Team = {
  id: number;
  name: string;
  score: number;
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

  const [teams, setTeams] = useState<Team[]>([]);
  // Load teams from localStorage when the component mounts
  useEffect(() => {
    const storedTeams = localStorage.getItem("teams");
    if (storedTeams) {
      setTeams(JSON.parse(storedTeams));
    }
  }, []);
  return (
    <div className="quizboard">
      <div className="team-panel">
        <TeamList teams={teams} />
      </div>
      <div className="quiz-card-grid">
        {Object.keys(groupedData).map((category) => (
          <div key={category} className="quiz-column">
            <h3>{category}</h3>
            <ul className="quiz-column-cards">
              {groupedData[category].map((data, index) => (
                <li className="quiz-slot" key={index}>
                  <QuizCard data={data} teams={teams} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizBoard;
