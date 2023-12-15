type Meta = {
  id: string;
  title: string;
  date: string;
  tags: string[];
};

type BlogPost = {
  meta: Meta;
  content: ReactElement<any, string | JSXElementConstructor<any>>;
};

type KeyboardHints = {
  [K in keyof UserGuesses]: {
    absent: string[];
    wrongPos: string[];
    correct: string[];
  };
};

type GuessRubric = {
  [Q: string]: number[];
  [W: string]: number[];
  [E: string]: number[];
  [R: string]: number[];
  [T: string]: number[];
  [Y: string]: number[];
  [U: string]: number[];
  [I: string]: number[];
  [O: string]: number[];
  [P: string]: number[];
  [A: string]: number[];
  [S: string]: number[];
  [D: string]: number[];
  [F: string]: number[];
  [G: string]: number[];
  [H: string]: number[];
  [J: string]: number[];
  [K: string]: number[];
  [L: string]: number[];
  [Z: string]: number[];
  [X: string]: number[];
  [C: string]: number[];
  [V: string]: number[];
  [B: string]: number[];
  [N: string]: number[];
  [M: string]: number[];
};

// type RubricKey = keyof GuessRubric;

type UserGuesses = {
  1: string[];
  2: string[];
  3: string[];
  4: string[];
  5: string[];
  6: string[];
};
