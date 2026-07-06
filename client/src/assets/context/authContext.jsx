import { useEffect, useState } from "react";
import { createContext } from "react";
import { getMe } from "../api/authApi";
import { paymentCheck } from "../api/paymentApi";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        async function getCurrentUser() {

            try {
                const res = await paymentCheck();
                console.log(res.data.message)

            } catch (error) {
                console.log(error?.response?.data?.message);
            }

            try {
                const res = await getMe()
                setUser(res.data.user);

            } catch (error) {
                setUser("")
                console.log(error?.response?.data?.message)
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