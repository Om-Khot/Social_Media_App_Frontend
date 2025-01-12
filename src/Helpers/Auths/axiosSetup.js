import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://social-media-backend-3fj6.onrender.com",
    headers: {
        "Content-Type": "application/json"
    }
});

export default axiosInstance;