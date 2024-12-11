import QuizCard from "./QuizCard";
import TeamList from "./TeamList";
import { useEffect, useState } from "react";
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
  const [isInitialized, setIsInitialized] = useState(false); // Flag to track initialization
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
    setIsInitialized(true); // Mark initialization as complete
  }, []);

  // Save teams to localStorage whenever `teams` changes, but only after initialization
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("teams", JSON.stringify(teams));
    }
  }, [teams, isInitialized]);

  const updateScore = (teamId: number, scoreDelta: number) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.id === teamId ? { ...team, score: team.score + scoreDelta } : team
      )
    );
  };
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
                  <QuizCard
                    data={data}
                    teams={teams}
                    updateScore={updateScore}
                  />
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
