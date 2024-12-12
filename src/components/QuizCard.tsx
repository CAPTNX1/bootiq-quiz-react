import { useState } from "react";
import Modal from "./QuizModal";
import imgPlay from "../assets/play.svg";
import imgStop from "../assets/stop.svg";

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
  };

  const playAudio = () => {
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

  const stopAudio = () => {
    if (audioPlayer) audioPlayer.pause();
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
      <Modal
        openModal={open}
        closeModal={handleClose}
        audio={data.audio}
        image={data.image}
      >
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
              <div className="media-player">
                <video autoPlay loop width="250">
                  <source src="src/assets/musi-circle.mp4" type="video/mp4" />
                </video>
                <div className="media-controls">
                  <button type="button" onClick={playAudio}>
                    <img src={imgPlay} width={20} height={20} />
                  </button>
                  <button type="button" onClick={stopAudio}>
                    <img src={imgStop} width={20} height={20} />
                  </button>
                </div>
              </div>
            )}

            {data.image && (
              <>
                <img src={data.image} width={500} />
              </>
            )}

            <button onClick={handleAnswer} className="arrow-btn">
              &rarr;
            </button>
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
