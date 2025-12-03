import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { redirect } from "next/navigation";


import { getCurrentUser, isAuthenticated } from "@/lib/actions/auth.action";
import Avatar from "@/components/Avatar";
import SignOutButton from "@/components/SignOutBtn";

const Layout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect("/sign-in");

  const user = await getCurrentUser();

  return (
    <div className="root-layout animate-fade-in">
      <nav className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Image src="/logo.svg" alt="MockMate Logo" width={38} height={32} className="transition-transform group-hover:scale-110" />
          <h2 className="text-primary-100 transition-colors group-hover:text-primary-200">PrepWise</h2>
        </Link>

        {user && (
          <div className="flex items-center gap-3">
            <span className="text-light-100 text-sm hidden sm:block">{user.name}</span>
            <Avatar name={user.name || "User"} size="md" />
            <SignOutButton />
          </div>
        )}
      </nav>

      <div className="animate-slide-up">
        {children}
      </div>
    </div>
  );
};

export default Layout;
