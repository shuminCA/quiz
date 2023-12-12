function Progress({ index, numQuestions, answer }) {
  return (
    <div className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
    </div>
  );
}

export default Progress;
