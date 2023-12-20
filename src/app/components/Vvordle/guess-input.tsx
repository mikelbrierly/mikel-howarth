import React from "react";

type Props = {
  submitGuess: any;
  onGuessChange: Function;
  userInputValue: string;
  setUserInputValue: Function;
  disabled: string;
  className: string;
  isReadOnly: boolean;
};

export default function GuessInput({
  onGuessChange,
  submitGuess,
  userInputValue,
  setUserInputValue,
  disabled,
  className,
  isReadOnly,
}: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        return submitGuess(userInputValue);
      }}
      className={`flex w-full max-w-xl ${className}`}
    >
      <input
        type="text"
        readOnly={isReadOnly}
        maxLength={5}
        minLength={5}
        className="text-black w-full mr-2 rounded-md"
        value={userInputValue}
        onChange={(e) => {
          e.target.value = e.target.value.toUpperCase();
          onGuessChange(e.target.value);
          return setUserInputValue(e.target.value);
        }}
        disabled={!!disabled}
      />
      <button
        disabled={!!disabled}
        className="bg-slate-900 border h-full text-sm p-1 text-white rounded-md"
      >
        Submit
      </button>
    </form>
  );
}
