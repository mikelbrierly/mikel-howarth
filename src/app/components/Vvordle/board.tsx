"use client";

import React from "react";
import Tile from "./tile";
import { range } from "../../../../utils";

// TODO: fix any types
type Props = {
  userGuesses: any;
  // keyboardHints: KeyboardHints;
  keyboardHints: any;
  attempt: keyof UserGuesses;
};

export default function Board({ userGuesses, keyboardHints, attempt }: Props) {
  const TileRow = ({ rowNum }: { rowNum: number }) => {
    let tileType = "";
    return (
      <div className="flex">
        {userGuesses[rowNum].map((item: string) => {
          const id = crypto.randomUUID();
          // const prevAttempt = attempt - 1;

          if (attempt === rowNum && attempt > 1) {
            if (keyboardHints[attempt].absent.includes(item)) {
              tileType = "absent";
            } else if (keyboardHints[attempt].wrongPos.includes(item)) {
              tileType = "wrong-pos";
            } else if (keyboardHints[attempt].correct.includes(item)) {
              tileType = "correct";
            }
          }
          console.log(tileType);

          return (
            <Tile key={id + rowNum} character={item} tileType={tileType} />
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      {range(6).map((item) => (
        <TileRow rowNum={item + 1} key={item} />
      ))}
    </div>
  );
}
