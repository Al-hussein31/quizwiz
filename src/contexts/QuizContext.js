import { createContext, useContext, useReducer, useEffect } from "react";

const QuizContext = createContext();

const SECS_PER_QUESTION = 30;

const questionsData = [
  {
    question: "What is the result of 7 + 5?",
    options: ["10", "11", "12", "13"],
    correctOption: 2,
    points: 10,
  },
  {
    question: "Which word is an antonym of 'ancient'?",
    options: ["Old", "Modern", "Classic", "Traditional"],
    correctOption: 1,
    points: 10,
  },
  {
    question:
      "If a train travels at 60 miles per hour, how far will it go in 3 hours?",
    options: ["120 miles", "180 miles", "200 miles", "210 miles"],
    correctOption: 1,
    points: 10,
  },
  {
    question: "Which sentence is grammatically correct?",
    options: [
      "She don’t like coffee.",
      "She doesn’t likes coffee.",
      "She doesn’t like coffee.",
      "She don’t likes coffee.",
    ],
    correctOption: 2,
    points: 10,
  },
  {
    question: "What is the square root of 64?",
    options: ["6", "7", "8", "9"],
    correctOption: 2,
    points: 10,
  },
  {
    question: "Choose the synonym of 'rapid'.",
    options: ["Slow", "Quick", "Gentle", "Silent"],
    correctOption: 1,
    points: 10,
  },
  {
    question: "Solve: 9 x 6 = ?",
    options: ["45", "52", "54", "63"],
    correctOption: 2,
    points: 10,
  },
  {
    question: "Identify the adverb in the sentence: 'She sings beautifully.'",
    options: ["She", "sings", "beautifully", "None"],
    correctOption: 2,
    points: 10,
  },
  {
    question: "What is 15% of 200?",
    options: ["25", "30", "35", "40"],
    correctOption: 1,
    points: 10,
  },
  {
    question: "Choose the correct plural form of 'child'.",
    options: ["Childs", "Child", "Children", "Childrens"],
    correctOption: 2,
    points: 10,
  },
  {
    question: "If x = 4, what is the value of 2x + 5?",
    options: ["10", "11", "13", "15"],
    correctOption: 2,
    points: 10,
  },
  {
    question: "Which word is a synonym for 'brave'?",
    options: ["Cowardly", "Bold", "Shy", "Timid"],
    correctOption: 1,
    points: 10,
  },
  {
    question: "Calculate: 45 ÷ 5 = ?",
    options: ["8", "9", "10", "12"],
    correctOption: 1,
    points: 10,
  },
  {
    question: "Which of these is a type of noun?",
    options: ["Verb", "Adjective", "Proper", "Adverb"],
    correctOption: 2,
    points: 10,
  },
  {
    question:
      "What is the area of a rectangle with length 5 cm and width 3 cm?",
    options: ["15 cm²", "8 cm²", "10 cm²", "12 cm²"],
    correctOption: 0,
    points: 10,
  },
  {
    question:
      "Identify the preposition in this sentence: 'The book is on the table.'",
    options: ["The", "is", "on", "table"],
    correctOption: 2,
    points: 10,
  },
  {
    question: "If you have 3/4 of a cake and eat 1/4, how much is left?",
    options: ["1/2", "1/3", "1/4", "2/4"],
    correctOption: 0,
    points: 10,
  },
  {
    question: "Select the comparative form of 'fast'.",
    options: ["Faster", "Fastest", "More fast", "Most fast"],
    correctOption: 0,
    points: 10,
  },
  {
    question:
      "What is the perimeter of a square with each side measuring 4 cm?",
    options: ["12 cm", "16 cm", "20 cm", "8 cm"],
    correctOption: 1,
    points: 10,
  },
  {
    question: "Which sentence uses 'they're' correctly?",
    options: [
      "They're going to the park.",
      "Their going to the park.",
      "There going to the park.",
      "They’re is going to the park.",
    ],
    correctOption: 0,
    points: 10,
  },
];

const initialState = {
  questions: [],
  status: "loading", // 'loading', 'error', 'ready', 'active', 'finished'
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
}

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  // Initialize the questions without fetch
  useEffect(() => {
    dispatch({ type: "dataReceived", payload: questionsData });
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext was used outside of the QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };
