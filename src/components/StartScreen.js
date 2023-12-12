function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h3>Welcome to the Hogwarts Sorting Experience!</h3>
      <h4>
        {numQuestions} questions to Discover your true Hogwarts House - Are you
        a brave Gryffindor, a wise Ravenclaw, a loyal Hufflepuff, or a cunning
        Slytherin?
      </h4>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
