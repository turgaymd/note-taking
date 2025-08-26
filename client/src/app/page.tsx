import ApiProvider from "../../ApiContext";
import Header from "./header";
import Notes from "./notes";
export default function Home() {

  return (
    <div className="min-h-screen pt-2">
      <ApiProvider>
            <Header/>
      <main className="flex flex-col  gap-8  items-center ">
        <Notes/>
      </main>
      </ApiProvider>
    </div>
  );
}
