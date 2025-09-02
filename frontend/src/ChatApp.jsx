import React, { useState ,useEffect } from "react";
// ES modules
import { io } from "socket.io-client";




const ChatApp = () => {
  
  const [socket, setsocket] = useState(null)
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! How can I help you today?" },
  ]);




  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);

    // Simulate bot response (replace this with API call)
    socket.emit("ai-message",input)  

    setInput(""); // Clear input
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };



  useEffect(() => {
    let socketInstance=io("http://localhost:3000");
    setsocket(socketInstance)

    socketInstance.on("ai-message-response",(response)=>{



      const newMessage = { role: "bot", text:JSON.stringify(response) };
    setMessages((prev) => [...prev, newMessage]);
    })
  }, [])
  

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <div className="flex-1 overflow-y-auto mb-4 p-4 bg-white rounded shadow">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg max-w-xs ${
              msg.role === "user"
                ? "ml-auto bg-blue-500 text-white"
                : "mr-auto bg-gray-200 text-black"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 px-4 py-2 border rounded focus:outline-none"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
