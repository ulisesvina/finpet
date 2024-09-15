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

    return (
        <header className="flex items-center justify-center p-3">
            <div className="flex flex-row justify-center items-center max-w-screen-md w-full rounded-lg p-4 px-5 bg-header">
                <h1 className="text-4xl font-bold mr-auto">finpet</h1>
                <nav>
                    {userSessionId ? (
                        <button onClick={handleSignOut}>Sign Out</button>
                    ) : (
                        <button onClick={handleSignIn}>Sign In</button>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
