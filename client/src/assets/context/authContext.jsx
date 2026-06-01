import { useEffect, useState } from "react";
import { createContext } from "react";
import { getMe } from "../api/authApi";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        async function getCurrentUser() {
            try {
                const res = await getMe()
                setUser(res.data.user);

            } catch (error) {
                setUser("")
                console.log(error.res.data.message)
            }
            finally {
                setLoading(false);
            }
        }

        getCurrentUser();

    }, [])

    console.log("user>", user)
    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;