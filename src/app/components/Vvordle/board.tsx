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
  className: string;
};

export default function Board({
  userGuesses,
  keyboardHints,
  attempt,
  className,
}: Props) {
  const TileRow = ({ rowNum }: { rowNum: number }) => {
    let tileType = "";
    return (
      <div className="flex w-full justify-around max-w-xs">
        {userGuesses[rowNum].map((item: string) => {
          const id = crypto.randomUUID();
          const prevAttempt = attempt - 1;

          // if (prevAttempt === rowNum) {
          if (keyboardHints[rowNum].absent.includes(item)) {
            tileType = "absent";
          } else if (keyboardHints[rowNum].wrongPos.includes(item)) {
            tileType = "wrong-pos";
          } else if (keyboardHints[rowNum].correct.includes(item)) {
            tileType = "correct";
          }
          // }

          return (
            <Tile key={id + rowNum} character={item} tileType={tileType} />
          );
        })}
      </div>
    );
  };

  return (
    <div className={`flex flex-col max-w-sm w-full items-center ${className}`}>
      {range(6).map((item) => (
        <TileRow rowNum={item + 1} key={item} />
      ))}
    </div>
  );
}
