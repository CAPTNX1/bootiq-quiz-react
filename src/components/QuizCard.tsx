type QuizCardProps = {
  data: any;
};

function QuizCard({ data }: QuizCardProps) {
  return (
    <button type="button" className="quiz-card">
      {data.score}
    </button>
  );
}

export default QuizCard;
