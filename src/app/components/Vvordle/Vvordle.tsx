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

  const [attempt, setAttempt] = React.useState<keyof UserGuesses>(1);

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
    const validWord = await IsWord(guess);

    if (!validWord) return alert("not a valid word!"); // TODO: make this the jiggle for invalid

    if (guess === WORD) return alert("you guessed it!"); // TODO: make this actual logic

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
    // console.log(nextKeyboardHints);
    // console.log(keyboardHints);

    setKeyboardHints(nextKeyboardHints);

    // console.log(keyboardHints);

    setAttempt((attempt + 1) as keyof UserGuesses);
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
    <main className="flex flex-col justify-center items-center w-screen h-screen">
      <Board
        userGuesses={userGuesses}
        keyboardHints={keyboardHints}
        attempt={attempt}
      />
      <br />
      <GuessInput onGuessChange={onGuessChange} submitGuess={submitGuess} />
      <br />
      <Keyboard
        keyboardHints={keyboardHints}
        characters={keyboardCharacters}
        attempt={attempt}
      />
      <br />
      {WORD}
    </main>
  );
}
