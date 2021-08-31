import React from "react";

function Button({ handleOnClick, buttonText, testId, disabled }) {
  return (
    <button onClick={handleOnClick} disabled={disabled} data-testid={testId}>
      {buttonText}
    </button>
  );
}

export default Button;
