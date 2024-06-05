import Image from "next/image";
import Form from "./form";

export default function Home() {
  return (
    <main className="w-full h-screen flex justify-center items-center dark:text-white">
      <Form />
    </main>
  );
}
