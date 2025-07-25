export const DotLoader = () => {
  return (
    <div className="loading-indicator">
      <span>Waiting for a response</span>
      <div className="dot-loader">
        <span className="dot dot1">.</span>
        <span className="dot dot2">.</span>
        <span className="dot dot3">.</span>
      </div>
    </div>
  );
};
