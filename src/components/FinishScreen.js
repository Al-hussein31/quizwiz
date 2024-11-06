import { useQuiz } from "../contexts/QuizContext";

function FinishScreen() {
  const { points, maxPossiblePoints, highscore, dispatch } = useQuiz();

  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <div className="finish-screen">
        <p className="result">
          <span className="result-emoji">{emoji}</span> You scored{" "}
          <strong>{points}</strong> out of <strong>{maxPossiblePoints}</strong>{" "}
          (<strong>{Math.ceil(percentage)}%</strong>)
        </p>

        <p className="highscore">
          Highscore: <strong>{highscore}</strong> points
        </p>

        <button
          className="btn btn-ui restart-btn"
          onClick={() => dispatch({ type: "restart" })}
        >
          🔄 Restart Quiz
        </button>
      </div>
      <p className="feedback-prompt">
        We’d love to hear your thoughts!{" "}
        <a
          href="https://forms.gle/XVDaHvMbg3s5kwLE8"
          target="_blank"
          rel="noopener noreferrer"
        >
          Click here to provide feedback
        </a>
        .
      </p>
    </>
  );
}

export default FinishScreen;
