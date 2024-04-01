import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const NavigationBar = () => {
  return (
    <div className="flex px-8 py-2 shadow-md mb-5">
      <div className="flex items-center">
        <Image src="/sahay-logo.webp" alt="sahay logo" width={40} height={40} />
        <Link href="/" className="text-lg">
          <span className="ml-4 text-slate-800 font-bold">Sahay</span>
          <span className="ml-1 text-slate-500 font-bold">AI</span>
        </Link>
      </div>
      <div className="flex flex-1 justify-end items-center gap-x-10 mr-20 text-gray-800">
        <a
          href="https://sahayai.com/"
          target="_blank"
          className="hover:underline"
        >
          Home
        </a>
        <a
          href="https://sahayai.com/pricing/"
          target="_blank"
          className="hover:underline"
        >
          Tech
        </a>
        <a
          href="https://sahayai.com/about/"
          target="_blank"
          className="hover:underline"
        >
          About
        </a>
        <a
          href="https://sahayai.com/blog/"
          target="_blank"
          className="hover:underline"
        >
          Blog
        </a>
        <a
          href="https://sahayai.com/contact/"
          target="_blank"
          className="hover:underline"
        >
          Contact
        </a>
      </div>
      <div className="flex items-center bg-slate-100 rounded-md px-4 py-1	cursor-pointer hover:bg-slate-200 text-gray-800">
        <div>John Doe</div>
        <Avatar className="ml-4">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default NavigationBar;
