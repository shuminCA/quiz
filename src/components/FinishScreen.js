function FinishScreen({ response, dispatch }) {

  const emoji = "🥳";

  return (
    <>
      <p className="result">
        {emoji} {response}
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
