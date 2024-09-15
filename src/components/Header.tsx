"use client";

import { createSession, removeSession } from "@/actions/auth-actions";
import { useUserSession } from "@/hooks/use-user-session";
import { signInWithGoogle, signOutWithGoogle } from "@/libs/firebase/auth";

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

  if (!userSessionId) {
    return (
      <header>
        <button onClick={handleSignIn}>Sign In</button>
      </header>
    );
  }
  return (
    <header className="flex items-center justify-between p-3">
      <div className="max-w-screen-md w-full rounded-md p-3 px-5">
        <h1 className="text-4xl font-bold">finpet</h1>
      </div>
      <button onClick={handleSignOut}>Sign Out</button>
    </header>
  );
};

export default Header;
