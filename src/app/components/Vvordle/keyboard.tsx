// TODO: fix any and use Letters type instead
// type Props = {
//   letters: Letters;
// };

type Props = {
  characters: string[]; // TODO: strengthen the types here
  keyboardHints: KeyboardHints;
};

import styles from "./styles/Keyboard.module.css";

export default function Keyboard({ characters, keyboardHints }: Props) {
  let color = "lightgrey";
  const rows: any[] = [[], [], []];

  const LetterKey = ({ character, color }: any) => {
    console.log("renders");
    if (keyboardHints.absent.includes(character)) {
      color = styles.absent;
    } else if (keyboardHints.wrongPos.includes(character)) {
      color = styles["wrong-pos"];
    } else if (keyboardHints.correct.includes(character)) {
      color = styles.correct;
    }
    const className = `${styles.wrapper}`;
    return <div className={`${className} ${color}`}>{character}</div>;
  };

  // TODO: switch to grid layout (maybe?)
  const QwertyLayout = ({ rows }: any) => (
    <div className="flex flex-col">
      <div className="row-1 flex">{rows[0]}</div>
      <div className="row-2 flex">{rows[1]}</div>
      <div className="row-3 flex">{rows[2]}</div>
    </div>
  );

  characters.forEach((letter, index) => {
    const key = (
      <LetterKey key={letter[0]} character={letter[0]} color={color} />
    );
    if (index < 10) {
      return rows[0].push(key);
    } else if (index > 9 && index < 19) {
      return rows[1].push(key);
    }
    rows[2].push(key);
  });

  return <QwertyLayout rows={rows} />;
}
