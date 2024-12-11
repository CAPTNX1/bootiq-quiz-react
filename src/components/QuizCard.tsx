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
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);

  const handleOpen = () => {
    setOpen(true);

    if (audioPlayer) {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
    }
    if (data.audio) {
      const newAudio = new Audio(data.audio);
      setAudioPlayer(newAudio);
      newAudio.play();
    }
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
    if (audioPlayer) {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
    }
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
            {data.audio && (
              <video autoPlay width="250">
                <source src="src/assets/musi-circle.mp4" type="video/mp4" />
              </video>
            )}

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
