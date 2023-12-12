function FetchScreen({ dispatch }) {
  let emoji = "🥳";
  console.log("FetchScreen");
  return (
    <>
      <p className="result">
        {emoji} The sorting hat is thinking about your house...
      </p>
    </>
  );
}

export default FetchScreen;
