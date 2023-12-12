import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import FetchScreen from "./FetchScreen";
import Footer from "./Footer";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [
    {
      question: "Do you value knowledge and wit over ambition?",
      options: ["Yes", "No"],
    },
    {
      question: "Do you value rules over fairness?",
      options: ["Yes", "No"],
    },
    {
      question: "Do you value hard work over fairness?",
      options: ["Yes", "No"],
    },
    {
      question: 'Do you value rules over chivalry?',
      options: ["Yes", "No"],
    },
    {
      question: "Do you value loyalty over bravery?",
      options: ["Yes", "No"],
    },
  ],
  // 'loading' | 'error' | 'ready' | 'active' | 'finished'
  status: "ready",
  index: 0,
  answer: null,
  totalAnswers: [],
  response: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      console.log("dataReceived", action.payload);
      return { ...state, response: action.payload, status: "finished" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      return {
        ...state,
        answer: action.payload.idx,
        totalAnswers: [...state.totalAnswers, action.payload.answer],
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      console.log(state);
      return {
        ...state,
        status: "fetching",
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    default:
      throw new Error("Unknown action type: " + action.type);
  }
}

export default function App() {
  const [
    { questions, status, index, answer, response, totalAnswers },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;

  useEffect(() => {
    async function fetchData() {
      const jsonRequest = { "source": null, "prompt": totalAnswers.join(' ') };
      const body = JSON.stringify(jsonRequest);
      const response = await fetch("http://localhost:8888/api/1/rest/slsched/feed/snaplogic/projects/shared/snap-gpt%20prompt%20RAG%20Task", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer UGqWHaRo7BXlE268XNkp2Gt5aNikjguE`
        },
        body,
      });
      console.log(totalAnswers);

      if (!response.ok) {
        dispatch({ type: "dataFailed" });
        return;
      }
      const data = response.body;
      if (!data) {
        dispatch({ type: "dataFailed" });
        return;
      }
      const jsonResponse = await response.json();
      const answer = jsonResponse[0].choices[0].content;
      console.log(answer);
      dispatch({ type: "dataReceived", payload: answer });
    }

    if (status === "fetching") {
      fetchData();
    }
  }, [status, totalAnswers]);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "fetching" && <FetchScreen dispatch={dispatch} />}
        {status === "finished" && (
          <FinishScreen
            response={response}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
