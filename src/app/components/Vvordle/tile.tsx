import styles from "./styles/Tile.module.css";

export default function Tile({ character, tileType }: any) {
  const className = `${styles.wrapper} ${styles[tileType]}`;
  return (
    <div
      className={`flex items-center justify-center text-white font-medium m-1 text-xl rounded-sm ${className} ${
        character ? "bg-none" : "bg-gray-900"
      }`}
    >
      {character}
    </div>
  );
}
