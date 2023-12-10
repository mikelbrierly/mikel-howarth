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

type Letters = {
  q: 0 | 1 | 2;
  w: 0 | 1 | 2;
  e: 0 | 1 | 2;
  r: 0 | 1 | 2;
  t: 0 | 1 | 2;
  y: 0 | 1 | 2;
  u: 0 | 1 | 2;
  i: 0 | 1 | 2;
  o: 0 | 1 | 2;
  p: 0 | 1 | 2;
  a: 0 | 1 | 2;
  s: 0 | 1 | 2;
  d: 0 | 1 | 2;
  f: 0 | 1 | 2;
  g: 0 | 1 | 2;
  h: 0 | 1 | 2;
  j: 0 | 1 | 2;
  k: 0 | 1 | 2;
  l: 0 | 1 | 2;
  z: 0 | 1 | 2;
  x: 0 | 1 | 2;
  c: 0 | 1 | 2;
  v: 0 | 1 | 2;
  b: 0 | 1 | 2;
  n: 0 | 1 | 2;
  m: 0 | 1 | 2;
};

type KeyboardHints = {
  absent: string[];
  wrongPos: string[];
  correct: string[];
};

type GuessRubric = {
  [q: string]: number[];
  [w: string]: number[];
  [e: string]: number[];
  [r: string]: number[];
  [t: string]: number[];
  [y: string]: number[];
  [u: string]: number[];
  [i: string]: number[];
  [o: string]: number[];
  [p: string]: number[];
  [a: string]: number[];
  [s: string]: number[];
  [d: string]: number[];
  [f: string]: number[];
  [g: string]: number[];
  [h: string]: number[];
  [j: string]: number[];
  [k: string]: number[];
  [l: string]: number[];
  [z: string]: number[];
  [x: string]: number[];
  [c: string]: number[];
  [v: string]: number[];
  [b: string]: number[];
  [n: string]: number[];
  [m: string]: number[];
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
