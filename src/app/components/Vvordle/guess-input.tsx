import React from "react";

type Props = {
  submitGuess: any;
  onGuessChange: Function;
};

export default function GuessInput({ onGuessChange, submitGuess }: Props) {
  const [userGuess, setUserGuess] = React.useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setUserGuess(""); // TODO: this is buggy, I don't think we should handle the clear logic here, as it gets out of sync with the state of the board.
        return submitGuess(userGuess);
      }}
    >
      <input
        type="text"
        placeholder="guess input component"
        maxLength={5}
        minLength={5}
        className="text-black w-fit"
        value={userGuess}
        onChange={(e) => {
          e.target.value = e.target.value.toUpperCase();
          onGuessChange(e.target.value);
          return setUserGuess(e.target.value);
        }}
      />
      <button className="bg-slate-400 border p-2">Submit</button>
    </form>
  );
}
