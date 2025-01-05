import { useEffect, useState } from 'react';
import './App.css';
import HomePage from './Pages/HomePage';
import LoginCard from './Pages/Auths/loginPage';
import { Route, Routes } from 'react-router-dom';
import SignUpCard from './Pages/Auths/signupPage';
import AuthContext from './Context/Auths/AuthContext';
import UserdetailsContext from './Context/User/UserdetailsContext';
import LoggedinUserContext from './Context/User/LoggedinUserContext';
import CreatePostPage from './Pages/Posts/creatingPostPage';
import SpecificPostsPostPage from './Pages/Posts/specificPostsPostPage';
import LoginErrorPage from './Pages/Error/loginErrorPage';
import SignUpErrorPage from './Pages/Error/signupErrorPage';
import UserDetailsCreatePage from './Pages/Users/UserDetailsCreatePage';
import SettingsPage from './Pages/Users/setiingPage';
import socket from './Helpers/SocketIo/SockcetIoSetup';
import PostActivitiesPage from './Pages/Activities/PostActivitiesPage';
import PostDetailsContext from './Context/Posts/PostDetailsContext';
import DeleteUserAccountPage from './Pages/SettingsPages/DeleteUserAccountPage';
import DeleteUserAuthPage from './Pages/Auths/deleteAccPage';
import checkAuthStatus from './Pages/Auths/VerifyLoginTokenPage';
import MsgMainPage from './Pages/Messages/MsgMainPage';
import ChatPage from './Pages/Messages/ChatPage';
import MsgContext from './Context/Messages/MsgContext';
import CreatingConversation from './Pages/Conversation/CreatingConversation';
import ErrorPage from './Pages/Error/generalErrorPage';

function App() {
  const [isLoggedIn , setIsLoogedIn] = useState(false);
  const [isLoading , setIsLoading] = useState(true);
  const [loggedInUserDetails, setLoggedInUserDetails] = useState({});
  const [userDetails , setUserDetails] = useState({});

  const [messages, setMessages] = useState([]);
  const [postDetails, setPostDetails] = useState([]);

  useEffect(()=>{
    // checking if user is already logged in after refresh
    const authenticate = async () => {
      const result = await checkAuthStatus();
      setIsLoogedIn(result ? true : false);
      setIsLoading(false);
      setLoggedInUserDetails(result.info ? result.info : {});
      setUserDetails(result.info ? result.info : {});
   }
   
    authenticate();
  },[]);

  useEffect(()=>{   
    
    // listen for any updates in userDetails
    console.log("Socket useEffect hits");
    socket.on('userDetailsUpdated', ({userId,updatedData}) => {
        console.log("Socket userDetailsUpdated",userId,updatedData);
        if(userId === userDetails._id){
            setUserDetails((prev) => ({
                ...prev,
                ...updatedData
            }) );
        }

        if(userId === loggedInUserDetails._id){
            setLoggedInUserDetails((prev) => ({
                ...prev,
                ...updatedData
            }));
        }
    });

    socket.on('postDetailsUpdated', ({postId,updatedData}) => {
        console.log("Socket postDetailsUpdated",postId,updatedData);
        if(postId === postDetails._id){
            setPostDetails((prev) => ({
                ...prev,
                ...updatedData
            }) );
        }
    });

    socket.on('messageSent',({msg}) => {
        console.log("Socket messageSent",msg);      
        setMessages((prev) => ([...prev,msg]));    
        console.log("Messages are:",messages);    
    });

    // cleanup listner on component unmount
    return () => {
        socket.off('userDetailsUpdated');
        socket.off('postDetailsUpdated');
        socket.off('messageSent');
    };

},[userDetails._id,setUserDetails,setPostDetails,postDetails._id,messages,setMessages]);
  
  return (
      <AuthContext.Provider value={{isLoggedIn,setIsLoogedIn}}>
        <LoggedinUserContext.Provider value={{loggedInUserDetails , setLoggedInUserDetails}}>
          <UserdetailsContext.Provider value={{userDetails,setUserDetails}}>
            <PostDetailsContext.Provider value={{postDetails,setPostDetails}}>
              <MsgContext.Provider value={{messages,setMessages}}>
                <div className='w-[100vw] h-[100vh] flex justify-center items-center'>
                  <div className='w-[97%] h-[97%] px-2 py-2 border-2 rounded-[45px] '>
                    <Routes>
                      <Route path='/' element={!isLoading && <LoginCard title={'Login'} />} />
                      <Route path='/signup' element={<SignUpCard title={'Signup'}/>} />
                      <Route path='/auth/delete' element={<DeleteUserAuthPage/>}/>
                      <Route path='/home' element={isLoggedIn ? <HomePage/> : <LoginCard title={'Login'}/>}/>
                      <Route path='/post' element={<CreatePostPage/>}/>
                      <Route path='/post/:userid' element={<SpecificPostsPostPage/>} />
                      <Route path='/activities/:postid' element={<PostActivitiesPage/>}/>
                      <Route path='/messages' element={<MsgMainPage/>}/>
                      <Route path='/messages/:conversationId' element={<ChatPage/>}/>
                      <Route path='/conversation' element={<CreatingConversation/>}/>
                      <Route path='/settings' element={<SettingsPage/>}/>
                      <Route path='/settings/accountManager/delete' element={<DeleteUserAccountPage/>}/>
                      <Route path='/settings/profileManager' element={<UserDetailsCreatePage/>}/>
                      <Route path='/error/auth/login/:msg' element={<LoginErrorPage/>}/>
                      <Route path='/error/auth/signup/:msg' element={<SignUpErrorPage/>}/>
                      <Route path='/error/general/:msg' element={<ErrorPage/>}/>
                    </Routes>          
                  </div>      
                </div> 
              </MsgContext.Provider>
            </PostDetailsContext.Provider>
          </UserdetailsContext.Provider>
        </LoggedinUserContext.Provider>
      </AuthContext.Provider>    
          
  );
}

export default App;
