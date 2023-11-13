import Posts from "../components/posts";

export const revalidate = 86400; // 1 day

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <h1 className="h-1 font-bold text-3xl block">Blog</h1>
      <Posts />
    </div>
  );
}
