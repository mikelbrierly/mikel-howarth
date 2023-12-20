// TODO: fix any and use Letters type instead
// type Props = {
//   letters: Letters;
// };

type Props = {
  characters: string[]; // TODO: strengthen the types here
  keyboardHints: KeyboardHints;
  keyOnClick: Function;
  onClickEnter: Function;
  onClickBackspace: Function;
  attempt: keyof UserGuesses;
};

import styles from "./styles/Keyboard.module.css";

export default function Keyboard({
  characters,
  keyboardHints,
  keyOnClick,
  onClickEnter,
  onClickBackspace,
  attempt,
}: Props) {
  let color = "lightgrey";
  const rows: any[] = [[], [], []];

  const LetterKey = ({ character, color }: any) => {
    // TODO: refactor
    Object.values(keyboardHints).forEach((item: any, index) => {
      const tempHints: any = { ...keyboardHints };
      if (item.correct.includes(character)) {
        return (color = styles.correct);
      }

      // if the previous guess had a higher color to show, then just return, because the keyboard colors should only go "up", never from green to yellow
      // TODO: this is awful though because index is not guaranteed to be a type that matches the keys of keyboardHints. Need to clean this up.
      if (tempHints[index]?.correct.includes(character)) return;
      if (item.wrongPos.includes(character)) {
        return (color = styles["wrong-pos"]);
      }
      // if the previous guess had a higher color to show, then just return, because the keyboard colors should only go "up", never from green to yellow
      // I also think there is a bug here getting out of sync with the state
      if (tempHints[index]?.wrongPos.includes(character)) return;
      if (item.absent.includes(character)) {
        return (color = styles.absent);
      }
    });

    const className = `${styles.wrapper}`;
    return (
      <button
        className={`${className} ${color}`}
        onClick={() => keyOnClick(character)}
      >
        {character}
      </button>
    );
  };

  // TODO: switch to grid layout (maybe?)
  const QwertyLayout = ({ rows }: any) => (
    <div
      className={`flex flex-col w-full pl-3 pr-3 max-w-xl ${styles["key-container"]}`}
    >
      <div className="row-1 flex justify-center items-center">{rows[0]}</div>
      <div className="row-2 flex justify-center items-center mr-4 ml-4">
        {rows[1]}
      </div>
      <div className="row-3 flex justify-center items-center">
        {/* TODO: add icons for backspace and other areas*/}
        <button
          className={`flex justify-center items-center min-w-fit ${styles["action-key"]}`}
          onClick={() => onClickEnter()}
        >
          ENTER
        </button>
        {rows[2]}
        <button
          className={`flex justify-center items-center min-w-fit ${styles["action-key"]}`}
          onClick={() => onClickBackspace()}
        >
          BKSPS
        </button>
      </div>
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
