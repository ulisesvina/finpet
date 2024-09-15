"use client";

import { getUserByCookie } from "@/actions/auth-actions";
import { User } from "@prisma/client";
import { useUserSession } from "@/hooks/use-user-session";
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext<{
    user: User | null;
    isLoading: boolean;
} | null>(null);

const AuthProvider = ({ children, session }: Readonly<{ children: React.ReactNode, session: any }>) => {
    const userSessionId = useUserSession(session);
    const [user, setUser] = useState<User | null>(null),
        [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUser = async () => {
            getUserByCookie().then((user) => {
                setUser(user);
            }).catch(() => {
                setUser(null);
            });

            return setIsLoading(false);
        };

        fetchUser();
    }, [userSessionId, session]);

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useUI must be used within a AuthProvider");
    }
    return context;
};

export { AuthProvider, useAuth };
export default AuthContext;