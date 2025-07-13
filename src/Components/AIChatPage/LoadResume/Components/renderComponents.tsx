export const renderLoading = () => {
  return (
    <div>
      <div className="loader"></div>
      <h2>Please wait, AI is generating questions...</h2>
    </div>
  );
};

export const renderError = () => {
  return (
    <div>
      <h3>Request error, please try again</h3>
      <button onClick={() => fetchQuestions()} className="ifErrorBtn">
        Try again
      </button>
    </div>
  );
};
