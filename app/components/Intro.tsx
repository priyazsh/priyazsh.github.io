import Image from "next/image";
import { GoDotFill } from "react-icons/go";
import Age from "./Age";
import Skills from "./Skills";
import Link from "next/link";
export default function Intro() {
  return (
    <div className="mt-2 sm:mt-4">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="rounded-full overflow-hidden w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 shrink-0">
          <Image
            src="/priyansh.jpg"
            alt="Priyansh Prajapat"
            width={200}
            height={200}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex flex-col min-w-0 flex-1">
          <h1 className="font-display font-semibold text-lg sm:text-xl truncate tracking-tight">Priyansh Prajapat</h1>
          <p className="text-gray-500 text-xs sm:text-sm font-mono">@priyanzsh</p>
          <span className="flex items-center text-green-500 text-xs sm:text-sm mt-0.5">
            <GoDotFill className="mr-1 text-green-500 shrink-0" />
            <span className="truncate">open for freelance work</span>
          </span>
        </div>
      </div>
      <p className="mt-3 sm:mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed font-sans">
        I'm Priyansh, a <Age />{" "}years old full stack web developer from India, I enjoy programming and exploring technology.
      </p>
      <p className="mt-3 sm:mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed font-sans">
        I build things with{" "}
        <span className="font-medium text-gray-100">
          <Skills />
        </span>{" "}
        & some other tooling, also I sometimes write <Link href={"/blog"} className="text-blue-400 hover:text-blue-300 transition-colors underline decoration-blue-400/30 hover:decoration-blue-400/60">blogs</Link>.
      </p>
    </div>
  );
}
