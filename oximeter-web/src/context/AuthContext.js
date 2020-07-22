import React, { useEffect, useState } from "react";
import { app } from "../resources/firebaseConfig";
import Loading from "../components/Loading";

export const Auth = React.createContext();

export const AuthContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        app.auth().onAuthStateChanged(function (user) {
            setUser(user);
            setShowChild(true);
        });
    }, []);

    if (!showChild) {
        return <Loading />;
    } else {
        return (
            <Auth.Provider value={{user}}>
                {children}
            </Auth.Provider>
        );
    }
};