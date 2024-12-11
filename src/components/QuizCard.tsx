import { useState } from "react";
import Modal from "./QuizModal";

type QuizCardProps = {
  data: any;
  teams: any;
  updateScore: (teamId: number, scoreDelta: number) => void;
};

function QuizCard({ data, teams, updateScore }: QuizCardProps) {
  const [open, setOpen] = useState(false);
  const [answered, setAnswered] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAnswer = () => {
    setAnswered(false);
  };

  const addScore = (teamId: number) => {
    updateScore(teamId, data.score);
    setOpen(false);
  };

  return (
    <>
      <Modal openModal={open} closeModal={handleClose}>
        {data.question}
        {!answered && (
          <>
            <span>{data.answer}</span>
            <div className="team-row">
              {teams.map((team: any) => (
                <div className="" key={team.id}>
                  <button
                    type="button"
                    className=""
                    onClick={() => addScore(team.id)}
                  >
                    {team.name}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
        {answered && (
          <>
            <button onClick={handleAnswer}>&rarr;</button>
          </>
        )}
      </Modal>
      {answered && (
        <button type="button" className="quiz-card" onClick={handleOpen}>
          {data.score}
        </button>
      )}
    </>
  );
}

export default QuizCard;
