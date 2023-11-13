import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center">
      <h1>Sorry, the requested page does not exist.</h1>
      <Link href="/">Back to Home</Link>
    </div>
  );
}
