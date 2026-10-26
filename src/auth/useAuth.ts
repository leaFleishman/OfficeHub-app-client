import { useContext } from "react"
import { AuthContext } from "./AuthContext"

// hook קטן שמחזיר את useContext(AuthContext)
export const useAuth = () => { const res =useContext(AuthContext); if (res == null) { throw new Error("useAuth must be used inside AuthProvider") } return res; }