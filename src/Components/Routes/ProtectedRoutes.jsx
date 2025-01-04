import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/Auths/AuthContext";
import { useContext, useEffect } from "react";



const ProtectedRoute = () =>{
    const navigate = useNavigate();
    navigate('/');    
};

export default ProtectedRoute;