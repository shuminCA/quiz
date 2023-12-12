function Options({ question, dispatch, answer }) {
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer correct" : ""
            }`}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: { idx: index, answer: `For the question ${question}, I perfer ${index === 0 ? "yes" : "no"}` } })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
