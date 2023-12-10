import styles from "./styles/Tile.module.css";

export default function Tile({ character }: any) {
  const className = `${styles.wrapper}`;
  return (
    <div
      className={`flex align-middle justify-center text-black font-bold ${className}`}
    >
      {character}
    </div>
  );
}
