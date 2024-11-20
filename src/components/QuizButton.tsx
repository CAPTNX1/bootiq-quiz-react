type QuizButtonProps = {
  quizName: string;
  quizSelect: any;
};

function QuizButton({ quizName, quizSelect }: QuizButtonProps) {
  return (
    <button type="button" className="quiz-button" onClick={quizSelect}>
      {quizName}
    </button>
  );
}

export default QuizButton;
