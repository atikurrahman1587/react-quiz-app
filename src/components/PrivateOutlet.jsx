import {useAuth} from "../contexts/AuthContext.jsx";
import { Navigate, Outlet } from "react-router-dom";
export default function PrivateOutlet(){
    const {currentUser} = useAuth();

    return currentUser ? <Outlet /> : <Navigate to="/login" />;
}