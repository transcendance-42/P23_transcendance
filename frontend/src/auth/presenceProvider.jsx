import { useAuth } from "./AuthContext";
import { authFetch } from "../api/authFetch";
import { useEffect } from "react";

export default function PresenceProvider({children}) {
    const { token, user } = useAuth()

    useEffect(() => {
        const ping = async () => {
        if (document.visibilityState === "visible")
            await authFetch('/api/hearthbeat', {
            method: 'POST',
            })
        }
        ping()
        const id = setInterval(ping, 30_000)
        document.addEventListener('visibilitychange', ping)
        return () => {
            clearInterval(id)
            document.removeEventListener('visibilitychange', ping)
        }
    }, [])
    return children
}
