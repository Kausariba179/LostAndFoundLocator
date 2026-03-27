/*const socket = new SockJS("http://localhost:9595/lostfound/ws");

 stompClient = new Client({
 webSocketFactory: () => socket,
 reconnectDelay: 5000,

 onConnect: () => {

 console.log("✅ Connected to WebSocket");
 setConnected(true);

 // Register user
 stompClient.publish({
 destination: "/app/register",
 body: JSON.stringify({ sender: autoName }),
 });

 // Subscribe to messages (only once)
 stompClient.subscribe("/topic/messages", (payload) => {
 const msg = JSON.parse(payload.body);
 setMessages((prev) => [...prev, msg]);
 });

 // Subscribe to online users list
 stompClient.subscribe("/topic/users", (payload) => {
 const list = JSON.parse(payload.body);
 setUsers(list);
 });
 },

 onStompError: (frame) => {
 console.error("Broker error:", frame.headers["message"]);
 },
 });

 stompClient.activate();
 ;
 */
import React, { useState, useEffect, useRef } from "react";

import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useNavigate } from 'react-router-dom';
let stompClient = null;
const getUniqueUser = () => {
  let baseUser = sessionStorage.getItem("username");

  if (!baseUser) return null;

  // Create unique tab-based identity
  let tabId = sessionStorage.getItem("tabId");

  if (!tabId) {
    tabId = Math.floor(Math.random() * 10000);
    sessionStorage.setItem("tabId", tabId);
  }

  return baseUser + "_" + tabId;
};
const ChatMessage = () => {

  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [username, setUsername] = useState("");
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(true);

  const messagesEndRef = useRef(null);

  
  // 🔹 Get user and connect
useEffect(() => {
  const uniqueUser = getUniqueUser();

  if (uniqueUser) {
    setUsername(uniqueUser);
    connect(uniqueUser);
  }

  return () => {
    if (stompClient) {
      stompClient.deactivate();
      stompClient = null;
    }
  };
}, []);

  // 🔹 Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔹 CONNECT
  const connect = (autoName) => {

    if (!autoName || !autoName.trim()) return;

    if (stompClient && stompClient.active) return;

    const socket = new SockJS("http://localhost:9595/lostfound/ws");

    stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,

      onConnect: () => {
        setConnected(true);
        setConnecting(false);

        // 🔹 Messages
        stompClient.subscribe("/topic/messages", (message) => {
          const body = JSON.parse(message.body);
          setMessages((prev) => [...prev, body]);
        });

        // 🔹 Online users
        stompClient.subscribe("/topic/users", (message) => {
          const users = JSON.parse(message.body);
          setOnlineUsers(Array.from(users));
        });

        // 🔹 Register user
stompClient.publish({
  destination: "/app/register",
  body: JSON.stringify({
    sender: autoName,
    type: "JOIN",
    content: "",
  }),
});
      },

      onDisconnect: () => {
        setConnected(false);
        stompClient = null;
      },

      onStompError: (frame) => {
        console.error("STOMP error:", frame);
        setConnecting(false);
      },
    });

    stompClient.activate();
  };

  // 🔹 SEND MESSAGE
  const handleSend = () => {
    if (!inputValue.trim() || !connected || !stompClient) return;

  stompClient.publish({
  destination: "/app/sendMessage",
  body: JSON.stringify({
    sender: username,
    content: inputValue.trim(),
    type: "CHAT",
  }),
});

    setInputValue("");
  };

  // 🔹 ENTER KEY
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };




  const [role] = useState("");
   const navigate = useNavigate();
   const returnBack = () => {
    if (role === 'Admin')
      navigate('/admin-menu');
    else
      navigate('/student-menu');
  }; 
 return (
  <div className="min-h-screen bg-gray-100">

    {/* NAVBAR SAME AS STUDENT MENU */}
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-purple-400 to-indigo-500 shadow-md px-8 py-4 flex justify-between items-center z-50">
      <h1 className="text-2xl font-bold text-white">💬 Chat Room</h1>

      <div className="flex items-center gap-4">
        <span className="text-white font-medium">
          {username.split("_")[0]}
        </span>
        <span>
            <button
                onClick={returnBack}
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
              >
                Return
              </button>
        </span>
      </div>
    
    </nav>

    {/* BODY */}
    <div className="pt-24 px-6 h-[calc(100vh-96px)] grid grid-cols-4 gap-6">

      {/* LEFT: ONLINE USERS */}
    <div className="col-span-1 bg-white rounded-xl shadow p-4 h-full">
        <h3 className="font-semibold text-gray-700 mb-3">
          Online Users ({onlineUsers.length})
        </h3>

     <ul className="space-y-2">
  {onlineUsers.map((user, index) => {
    const cleanName = user.split("_")[0]; 

    return (
      <li
        key={index}
        className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-lg"
      >
        <span>{cleanName}</span>

        {user === username && (
          <span className="text-xs text-indigo-500">(You)</span>
        )}
      </li>
    );
  })}
</ul>
      </div>

      {/* RIGHT: CHAT AREA */}
    <div className="col-span-3 bg-white rounded-xl shadow flex flex-col h-full">

        {/* STATUS */}
     <div className="px-4 py-2 border-b text-sm sticky top-0 bg-white z-10">
          {connecting && <span className="text-yellow-500">Connecting...</span>}
          {connected && <span className="text-green-600">Connected</span>}
          {!connected && !connecting && (
            <span className="text-red-500">Disconnected</span>
          )}
        </div>

        {/* MESSAGES */}
    <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.length === 0 && (
            <p className="text-gray-400 text-center mt-10">
              No messages yet...
            </p>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === username ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs ${
                  msg.sender === username
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                <p className="text-xs font-semibold">{msg.sender}</p>
                <p>{msg.content}</p>
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        <div className="p-4 border-t flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button
            onClick={handleSend}
            disabled={!connected}
            className="bg-indigo-500 text-white px-5 py-2 rounded-lg hover:bg-indigo-600 disabled:opacity-50"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  </div>
);
};

export default ChatMessage;