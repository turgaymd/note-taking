"use client"
import ApiProvider from "../../ApiContext";
import NoteProvider from "../../NoteContext";
import Header from "./header";
import Notes from "./notes";

export default function Home() {
  return (
    <div className="min-h-screen pt-2">
      <ApiProvider>
        <NoteProvider>
            <Header />
      <main className="flex flex-col  gap-8  items-center ">
        <Notes/>
      </main>
      </NoteProvider>
      </ApiProvider>
      
    </div>
  );
}
