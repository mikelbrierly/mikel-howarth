import Link from "next/link";

type Props = {
  post: Meta;
};

export default function ListItem({ post }: Props) {
  const { id, title, date } = post;
  // TODO: format date

  return (
    <li className="mt-4 text-2xl">
      <Link className="underline" href={`/blog/posts/${id}`}>
        {title}
      </Link>
      <br />
      <p className="text-sm mt-1">{date}</p>
    </li>
  );
}
