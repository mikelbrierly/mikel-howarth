"use client";

import React from "react";
import Tile from "./tile";
import { range } from "../../../../utils";

type Props = {
  userGuesses: any;
};

export default function Board({ userGuesses }: Props) {
  const TileRow = ({ rowNum }: { rowNum: number }) => {
    return (
      <div className="flex">
        {userGuesses[rowNum].map((item: string) => {
          const id = crypto.randomUUID();
          return <Tile key={id + rowNum} character={item} />;
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
