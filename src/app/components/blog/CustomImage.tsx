import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  priority?: boolean;
  placeholder?: "empty" | "blur"; // TODO: or "data:image/..."
  blurDataURL?: "string"; // "data:image/jpeg..."
};

export default function CustomImage({
  src,
  alt,
  priority,
  placeholder,
  blurDataURL,
}: Props) {
  const prty = priority ? true : false;

  return (
    <Image
      className="rounded-lg mx-auto"
      src={src}
      alt={alt}
      width={650}
      height={650}
      priority={prty}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
    />
  );
}
