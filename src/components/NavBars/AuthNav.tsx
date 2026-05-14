"use client";
import { Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function AuthNav() {
  const pathname = usePathname();

  return (
    <nav className="text-white sticky top-0 bg-[#232423] justify-between flex px-2 items-center py-2">
      <Link href="/" className="flex gap-1 items-center text-[#8082FD]">
        <Zap />
        <span className="font-semibold text-sm md:text-lg text-[#8082FD]">
          PrepMaster AI
        </span>
      </Link>

      <Link
        href={pathname == "/sign-up" ? "sign-in" : "sign-up"}
        className="font-semibold font-mono text-[#8f8ac7] hover:underline"
      >
        {pathname == "/sign-up" ? "Sign-In" : "Sign-up"}
      </Link>
    </nav>
  );
}

export default AuthNav;
