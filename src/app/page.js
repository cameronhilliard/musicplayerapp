import Image from "next/image";
import Musicplayer from "./components/Musicplayer";

export default function Home() {
  return (
    <div className="grid grid-cols-1 w-4/5 items-center justify-center mx-auto ">
      
    <Musicplayer />
   
    </div>
  );
}
