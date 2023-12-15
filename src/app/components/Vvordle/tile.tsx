import styles from "./styles/Tile.module.css";

export default function Tile({ character, tileType }: any) {
  const className = `${styles.wrapper} ${styles[tileType]}`;
  return (
    <div
      className={`flex align-middle justify-center text-black font-bold ${className}`}
    >
      {character}
    </div>
  );
}
