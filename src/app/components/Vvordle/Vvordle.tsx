"use client";

import React from "react";

import Board from "./board";
import Keyboard from "./keyboard";
import GuessInput from "./guess-input";
import FetchWord from "./fetch-word";
import IsWord from "./is-word";

export default function Vvordle() {
  const [guessRubric, setGuessRubric] = React.useState<GuessRubric>({
    q: [],
    w: [],
    e: [],
    r: [],
    t: [],
    y: [],
    u: [],
    i: [],
    o: [],
    p: [],
    a: [],
    s: [],
    d: [],
    f: [],
    g: [],
    h: [],
    j: [],
    k: [],
    l: [],
    z: [],
    x: [],
    c: [],
    v: [],
    b: [],
    n: [],
    m: [],
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

  const [attempt, setAttempt] = React.useState<number>(1);

  const keyboardCharacters = Object.keys(guessRubric);
  const [keyboardHints, setKeyboardHints] = React.useState<KeyboardHints>({
    absent: [],
    wrongPos: [],
    correct: [],
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

    // logic to check the guess against the real answer, and then update the guess_key accordingly.

    // console.log(`you guessed ${guess}, which returned: ${validWord}`);

    const correct = guess
      .split("")
      .filter((item, index) => guessRubric[item].includes(index));

    const wrongPos = guess.split("").filter((item, index) => {
      return guessRubric[item].length > 0 && !guessRubric[item].includes(index);
    });

    const absent = guess
      .split("")
      .filter((item, index) => guessRubric[item].length === 0);

    // console.log("correct: ", correct);
    // console.log("wrongPos: ", wrongPos);
    // console.log("absent: ", absent);

    setKeyboardHints({
      absent: [...absent, ...keyboardHints.absent],
      wrongPos: [...wrongPos, ...keyboardHints.wrongPos],
      correct: [...correct, ...keyboardHints.correct],
    });

    // console.log(keyboardHints);

    setAttempt(attempt + 1);
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
      <Board userGuesses={userGuesses} />
      <br />
      <GuessInput onGuessChange={onGuessChange} submitGuess={submitGuess} />
      <br />
      <Keyboard keyboardHints={keyboardHints} characters={keyboardCharacters} />
      <br />
      {WORD}
    </main>
  );
}
