import {io} from "socket.io-client";

const socket = io("http://localhost:3000"); // this is the backend server url

export default socket;


