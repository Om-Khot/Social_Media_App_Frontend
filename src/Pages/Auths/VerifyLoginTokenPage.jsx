import axios from "axios";

const checkAuthStatus = async () => {
    try {
        const response = await axios.get('https://social-media-backend-3fj6.onrender.com/auth/verifyToken',{
            withCredentials: true
        });
        console.log("checkAuthStatus",response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }    
};

export default checkAuthStatus;