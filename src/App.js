import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [count, setCount] = React.useState(0);
  const [displayError, setDisplayError] = React.useState(false);

  const handleDecrement = () => {
    if (count === 0) {
      setDisplayError(true);
    } else {
      setCount(count - 1);
    }
  };

  const handleIncrement = () => {
    setDisplayError(false);
    setCount(count + 1);
  };

  return (
    <div data-test="component-app">
      <h1 data-test="counter-display">
        The counter is currently&nbsp;<span data-test="count">{count}</span>
      </h1>
      {displayError && (
        <h2 data-test="error-display" style={{ color: "red" }}>
          The counter can't go below 0.
        </h2>
      )}

      <button onClick={() => handleIncrement()} data-test="increment-button">
        Increment counter
      </button>
      <button onClick={() => handleDecrement()} data-test="decrement-button">
        Decrement counter
      </button>
    </div>
  );
}

export default App;
