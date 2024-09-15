"use client";

import { createSession, removeSession } from "@/actions/auth-actions";
import { useUserSession } from "@/hooks/use-user-session";
import { signInWithGoogle, signOutWithGoogle } from "@/libs/firebase/auth";
import Link from "next/link";

const Header = ({ session }: { session: string | null }) => {
  const userSessionId = useUserSession(session);

  const handleSignIn = async () => {
    const userUid = await signInWithGoogle();
    if (userUid) {
      await createSession(userUid);
    }
  };

  const handleSignOut = async () => {
    await signOutWithGoogle();
    await removeSession();
  };

    return (
        <div className={"visible opacity-100 mb-32 transition-opacity duration-500 ease-in-out"}>
            <header id="header" className={`fixed top-0 left-0 w-full flex items-center z-50 transition-transform duration-500 ease-in-out transform translate-y-0`}>
                <div className="flex flex-col md:flex-row items-center justify-center w-full p-2 pt-4">
                    <header className="border border-1 border-primary max-w-screen-md w-full rounded-xl bg-background backdrop-blur-md px-4 py-3 shadow-lg flex justify-between items-center">
                        <h1 className="text-3xl font-bold">
                            <Link href="/">finpet</Link>
                        </h1>
                        <div className="hidden md:flex">
                            <nav className="text-lg">
                                <ul className="flex space-x-5">
                                    {userSessionId ? (
                                        <>
                                            <li>
                                                <Link className="hover:underline" href="/dashboard">Dashboard</Link>
                                            </li>
                                            <li>
                                                <button className="hover:underline" onClick={handleSignOut}>Sign out</button>
                                            </li>
                                        </>
                                    ) : (
                                        <li>
                                            <button className="hover:underline" onClick={handleSignIn}>Sign in</button>
                                        </li>
                                    )}
                                </ul>
                            </nav>
                        </div>
                    </header>
                </div>
            </header>
        </div>
      </header>
    </div>
  );
};

export default Header;
