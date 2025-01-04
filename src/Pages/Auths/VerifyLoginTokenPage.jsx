import axios from "axios";

const checkAuthStatus = async () => {
    try {
        const response = await axios.get('http://localhost:3000/auth/verifyToken',{
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