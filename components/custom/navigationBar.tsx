import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const NavigationBar = () => {
  return (
    <div className="flex px-8 py-4 justify-between">
      <div className="flex items-center">
        <Image src="/sahay-logo.webp" alt="sahay logo" width={40} height={40} />
        <Link href="/" className="text-lg">
          <span className="ml-4 text-slate-800 font-bold">Sahay</span>
          <span className="ml-1 text-slate-500 font-bold">AI</span>
        </Link>
      </div>
      <div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default NavigationBar;
