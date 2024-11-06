import { useQuiz } from "../contexts/QuizContext";

function StartScreen() {
  const { numQuestions, dispatch } = useQuiz();

  return (
    <div className="start-screen">
      <h2 className="welcome-heading">🚀 Welcome to QuizWiz!</h2>
      <h3 className="question-count">
        {numQuestions} questions to test your mastery
      </h3>

      <button
        className="btn btn-ui start-btn"
        onClick={() => dispatch({ type: "start" })}
      >
        🎉 Let's Start!
      </button>
    </div>
  );
}

export default StartScreen;
