import axiosInstance from "./axiosSetup";

export const loginUser = async (formData) => {
    const response = await axiosInstance.post("/auth/login", formData, {
        withCredentials: true
    });
    return response;
};

export const logoutUser = async () => {
    const response = await axiosInstance.post("/auth/logout",{}, {
        withCredentials: true
    });   
    return response;
};

export const signupUser = async (formData) => {
    const response = await axiosInstance.post("/auth/signup", formData);
    return response;
};

export const getUserDetails = async (details) => {
    const response = await axiosInstance.post(`/user`, details);
    return response;
}

export const createPost = async (postData) => {
    const response = await axiosInstance.post(`/post`, postData);
    return response;
}

export const fetchAllPosts = async () => {
    const response = await axiosInstance.get(`/post`);
    return response;
}

export const likePost = async (likeDetails) => {
    console.log("likedeatilas axios hit");
    const response = await axiosInstance.post(`/post/like`, likeDetails);
    return response;
}

export const disLikePost = async (dislikeDetails) => {
    console.log("dislikedeatilas axios hit");
    const response = await axiosInstance.post(`/post/dislike`, dislikeDetails);
    return response;
}

export const fetchPostOfOneUser = async (userid) => {
    console.log("fetchPostOfOneUser axios hit");
    const response = await axiosInstance.get(`/post/${userid}`);
    return response;
}

export const fetchOnePostById = async (postid) => {
    console.log("fetchOnePostById axios hit");
    const response = await axiosInstance.get(`/post/one/${postid}`);
    return response;
}

export const updateProfile = async (profileDetails) => {
    console.log("updateProfile axios hit");
    const response = await axiosInstance.post(`/settings/profile`, profileDetails);
    return response;
}

export const createComment = async (commentDetails) => {
    console.log("createComment axios hit");
    const response = await axiosInstance.post(`/comment`, commentDetails);
    return response;
}

export const fetchAllComments = async (postid) => {
    console.log("fetchAllComments axios hit");
    const response = await axiosInstance.get(`/comment/${postid}`);
    return response;
}

export const fetchAllLikes = async (postid) => {
    console.log("fetchAllLikes axios hit");
    const response = await axiosInstance.get(`/post/likes/${postid}`);
    return response;
}

export const createConversation = async (conversationDetails) => {
    console.log("createConversation axios hit");
    const response = await axiosInstance.post(`/conversation`, conversationDetails);
    return response;
}

export const allConversationsOfAUser = async (userId) => {
    console.log("allConversationsOfAUser axios hit");
    const response = await axiosInstance.get(`/conversation/${userId}`);
    return response;
}
export const allMessages = async (conversationId) => {
    console.log("allMessages axios hit");
    const response = await axiosInstance.get(`/message/${conversationId}`);
    return response;
}

export const sendMessage = async (messageDetails) => {
    console.log("sendMessage axios hit");
    const response = await axiosInstance.post(`/message`, messageDetails);
    return response;
}

export const deleteAccount = async (userid) => {
    console.log("deleteAccount axios hit");
    const response = await axiosInstance.delete(`/user/${userid}`);
    return response;
}

export const deletePost = async (postid) => {
    console.log("deletePost axios hit");
    const response = await axiosInstance.delete(`/post/${postid}`);
    return response;
}