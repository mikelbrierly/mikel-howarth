import React from "react";

type Props = {
  textColor: string;
  submitGuess: any;
  onGuessChange: Function;
};

export default function GuessInput({
  textColor,
  onGuessChange,
  submitGuess,
}: Props) {
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
        className={`text-${textColor}`}
        value={userGuess}
        onChange={(e) => {
          onGuessChange(e.target.value);
          return setUserGuess(e.target.value);
        }}
      />
    </form>
  );
}
