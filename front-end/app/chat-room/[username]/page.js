"use client";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useParams } from "next/navigation";
import AvatarWithMessage from "../../../component/AvaterWithMessage";
import ActionMessage from "../../../component/ActionMessage";
import { getAvatarColor } from "../../../utils/AvaterColor";

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [client, setClient] = useState(null);
  const params = useParams();

  useEffect(() => {
    const wsUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL;
    const socket = new SockJS(wsUrl);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      onConnect: () => {
        console.log("Connected");

        // Subscribe
        stompClient.subscribe("/topic/public", (message) => {
          const newMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        // Send JOIN message once connected
        stompClient.publish({
          destination: "/app/chat.addUser",
          body: JSON.stringify({
            content: "",
            sender: params.username,
            type: "JOIN",
          }),
        });
      },
      onDisconnect: () => {
        console.log("Disconnected");
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
    };
  }, []);

  const sendMessage = () => {
    if (client && input) {
      const message = {
        destination: "/app/chat.sendMessage",
        body: JSON.stringify({
          content: input,
          sender: params.username,
          type: "CHAT",
        }),
      };
      client.publish(message);
      setInput("");
    }
  };

  return (
    <div className="chat-page-container">
      <div className="chat-card">
        <h2 className="chat-title">Chat Room</h2>
        <div className="messages-container">
          {messages.map((m, i) => {
            console.log(m);
            if (m.type == "CHAT") {
              return (
                <AvatarWithMessage
                  color={getAvatarColor(m.sender)}
                  message={m}
                  key={i}
                />
              );
            } else if (m.type == "JOIN") {
              return (
                <ActionMessage message={`${m.sender} join the chat`} key={i} />
              );
            } else {
              return (
                <ActionMessage message={`${m.sender} left the chat`} key={i} />
              );
            }
          })}
        </div>
        <div className="message-input-wrapper">
          <input
            className="message-input"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
            type="text"
            placeholder="Type a message..."
          />
          <button className="send-button" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
