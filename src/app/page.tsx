import Image from "next/image";
import Notes from "./notes";
export default function Home() {

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
               <header>
       <h2 className="font-bold text-2xl text-center text-slate-500">Take notes</h2>
       </header>
      <main className="flex flex-col  gap-8  items-center ">
      <Notes/>
      </main>
    </div>
  );
}
