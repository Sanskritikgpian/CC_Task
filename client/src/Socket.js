import { io } from "socket.io-client";
import { SERVER_ENDPOINT } from "./constants/endpoints";

const socket = io(SERVER_ENDPOINT);

export default socket;