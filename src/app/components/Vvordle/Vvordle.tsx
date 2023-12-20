"use client";

import React from "react";

import Board from "./board";
import Keyboard from "./keyboard";
import GuessInput from "./guess-input";
import FetchWord from "./fetch-word";
import IsWord from "./is-word";

export default function Vvordle() {
  const [guessRubric, setGuessRubric] = React.useState<GuessRubric>({
    Q: [],
    W: [],
    E: [],
    R: [],
    T: [],
    Y: [],
    U: [],
    I: [],
    O: [],
    P: [],
    A: [],
    S: [],
    D: [],
    F: [],
    G: [],
    H: [],
    J: [],
    K: [],
    L: [],
    Z: [],
    X: [],
    C: [],
    V: [],
    B: [],
    N: [],
    M: [],
  });

  const [userGuesses, setUserGuesses] = React.useState<UserGuesses>({
    1: ["", "", "", "", ""],
    2: ["", "", "", "", ""],
    3: ["", "", "", "", ""],
    4: ["", "", "", "", ""],
    5: ["", "", "", "", ""],
    6: ["", "", "", "", ""],
  });

  const WORD = FetchWord();
  const [gameOver, setGameOver] = React.useState<"" | "loss" | "win">("");

  const [attempt, setAttempt] = React.useState<keyof UserGuesses>(1);

  const [userInputValue, setUserInputValue] = React.useState("");
  const [isReadOnly, setIsReadOnly] = React.useState(false);

  const keyboardCharacters = Object.keys(guessRubric);

  const [keyboardHints, setKeyboardHints] = React.useState<KeyboardHints>({
    1: {
      absent: [],
      wrongPos: [],
      correct: [],
    },
    2: {
      absent: [],
      wrongPos: [],
      correct: [],
    },
    3: {
      absent: [],
      wrongPos: [],
      correct: [],
    },
    4: {
      absent: [],
      wrongPos: [],
      correct: [],
    },
    5: {
      absent: [],
      wrongPos: [],
      correct: [],
    },
    6: {
      absent: [],
      wrongPos: [],
      correct: [],
    },
  });

  React.useEffect(() => {
    const nextGuessRubric: GuessRubric = { ...guessRubric };
    WORD.split("").forEach((item: string, index) => {
      nextGuessRubric[item].push(index);
    });
    setGuessRubric(nextGuessRubric);
    // console.log(guessRubric); // TODO: figure out issue where this is running twice. Not sure why.

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [WORD]); // not sure if eslint is just warning here or if I'm using useEffect wrong.

  // the key to match against
  // const [key, setKey] = React.useState(GUESS_KEY);

  // console.log("key", key);
  // console.log("letterHints", letterHints);

  const submitGuess = async (guess: string) => {
    if (userInputValue && !guess) {
      guess = userInputValue;
    }

    if (attempt > 6) return;
    const validWord = await IsWord(guess);

    if (!guess || !validWord) return alert("not a valid word!"); // TODO: make this the jiggle for invalid

    // if (guess === WORD) return alert("you guessed it!"); // TODO: make this actual logic

    const correct = guess
      .split("")
      .filter((item, index) => guessRubric[item].includes(index));

    const wrongPos = guess.split("").filter((item, index) => {
      return guessRubric[item].length > 0 && !guessRubric[item].includes(index);
    });

    const absent = guess
      .split("")
      .filter((item, index) => guessRubric[item].length === 0);

    const nextKeyboardHints = {
      ...keyboardHints,
      [attempt]: {
        absent: [...absent, ...keyboardHints[attempt].absent],
        wrongPos: [...wrongPos, ...keyboardHints[attempt].wrongPos],
        correct: [...correct, ...keyboardHints[attempt].correct],
      },
    };

    // TODO: trigger flip animation (reveal row)

    setKeyboardHints(nextKeyboardHints);

    setAttempt((attempt + 1) as keyof UserGuesses);

    setUserInputValue("");

    if (attempt === 6 && guess !== WORD) {
      setGameOver("loss");
    }

    if (guess === WORD) {
      setGameOver("win");
    }
  };

  const keyOnClick = (char: string) => {
    if (userInputValue.length >= 5) return;
    const nextUserInputValue = userInputValue + char;
    setUserInputValue(nextUserInputValue);
    onGuessChange(nextUserInputValue);
  };

  const onClickBackspace = () => {
    if (userInputValue.length === 0) return;
    const nextUserInputValue = userInputValue.slice(
      0,
      userInputValue.length - 1
    );
    setUserInputValue(nextUserInputValue);
    onGuessChange(nextUserInputValue);
  };

  const onGuessChange = (letters: string) => {
    const userGuessCopy = userGuesses[attempt as keyof UserGuesses];

    userGuessCopy.forEach((value, index) => {
      if (letters.split("")[index]) {
        return (userGuessCopy[index] = letters.split("")[index]);
      }
      userGuessCopy[index] = "";
    });

    setUserGuesses({
      ...userGuesses,
      [attempt]: userGuessCopy,
    });
  };

  return (
    <main className="flex flex-col justify-start items-center p-6 h-screen bg-zinc-950">
      <div className="flex mb-1">
        <input
          id="vvordle-input"
          type="checkbox"
          checked={isReadOnly}
          onChange={(e) => {
            setIsReadOnly(e.target.checked);
          }}
          className="text-stone-50"
        />
        <label htmlFor="vvordle-input" className="text-xs ml-2 text-stone-50">
          INPUT FIELD
        </label>
      </div>
      <Board
        className="mb-5"
        userGuesses={userGuesses}
        keyboardHints={keyboardHints}
        attempt={attempt}
      />
      {isReadOnly && (
        <GuessInput
          className="mb-5"
          onGuessChange={onGuessChange}
          submitGuess={submitGuess}
          userInputValue={userInputValue}
          setUserInputValue={setUserInputValue}
          disabled={gameOver}
          isReadOnly={!isReadOnly}
        />
      )}
      <span className="flex h-8">
        {gameOver === "loss" && <p>😦 {WORD}</p>}
        {gameOver === "win" && <p>🎉</p>}
        {gameOver === "" && <p>🤔</p>}
      </span>
      {!isReadOnly && (
        <Keyboard
          keyboardHints={keyboardHints}
          keyOnClick={keyOnClick}
          onClickBackspace={onClickBackspace}
          onClickEnter={submitGuess}
          characters={keyboardCharacters}
          attempt={attempt}
        />
      )}
    </main>
  );
}
