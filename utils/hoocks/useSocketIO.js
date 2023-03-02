import { useEffect, useState } from "react";
import io from "socket.io-client";

// const socket = io("https://socket.loca.lt");
const socket = io("https://socket.bitcomer.com");
// const socket = io("dssd");

const useSocketIO = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  const [stateUser, setStateUser] = useState(null);
  const [chat, setChat] = useState([]);
  const [chatContent, setChatContent] = useState(null)

  const connectUser = (userId) => {

    if (!userId) {
      console.warn("No userId provided");
      return;
    }
    if (!socket.connected) {
      console.warn("Socket is not connected");
      return;
    }

    console.log("Connecting user:", userId);
    socket.emit("userConnect", userId, (res) => {

    });
    // socket.on("matiStatus", userId?.userVerification?.account?.status, (res) => {
    //   console.log(res);
    // });

  };



  // const lisen = (event, data) => {{
  //   socket.on(event, data)
  // }}



  useEffect(() => {
    // socket.on("matiStatus", () => {
    //   setIsConnected(true);
    //   // console.log(`Connected: ${socket.id}`);
    // });

    socket.on("matiStatus", (data) => {
      setIsConnected(true);
      setStateUser(data);
      // console.log(data);
    });

    socket.on("chat", (data) => {
      setIsConnected(true);
      if (data) {
        setChat(data);
      }


    });
    socket.on("chatContent", (data) => {
      setIsConnected(true);
      setChatContent(data);

    });



    // socket.on("matiStatus", () => {
    //   setIsConnected(false);
    //   // console.log("disconnected");
    // });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return { isConnected, connectUser, stateUser, chat, chatContent, };
};

export default useSocketIO;
