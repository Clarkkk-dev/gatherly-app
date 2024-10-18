import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { IoIosSend } from "react-icons/io";

const Itinerary = () => {
  const [message, setMessage] = useState("");
  const [isResponseScreen, setIsResponseScreen] = useState(false);
  const [messages, setMessages] = useState([]);

  const hitRequest = () => {
    if (message) {
      generateResponse(message);
    } else {
      alert("You must write something...!");
    }
  };

  const generateResponse = async (msg) => {
    if (!msg) return;

    const genAI = new GoogleGenerativeAI(
      "AIzaSyDNrmBWogq8LdBCpJPyvTUugbpwFKKQNvc"
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(msg);

    const newMessages = [
      ...messages,
      { type: "userMsg", text: msg },
      { type: "responseMsg", text: result.response.text() },
    ];

    setMessages(newMessages);
    setIsResponseScreen(true);
    setMessage("");
  };

  const newChat = () => {
    setIsResponseScreen(false);
    setMessages([]);
  };

  return (
    <div className="flex flex-col mt-[100px] items-center">
      <div className="response-screen w-full max-w-4xl">
        <div className="header">
          <button
            onClick={newChat}
            className="bg-[#FF6F00] p-3 text-white font-bold rounded-md mb-5"
          >
            New Chat
          </button>
        </div>

        <div className="message-container w-full h-[400px] rounded-md border p-5 overflow-y-auto mb-5">
          {messages?.map((msg, index) => (
            <div
              key={index}
              className={`text-2xl mb-4 p-3 rounded-lg w-auto min-w-[10px] max-w-full break-words ${
                msg.type === "userMsg"
                  ? "ml-auto bg-[#FF6F00] text-white text-right "
                  : "mr-auto bg-gray-100 text-black text-left"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
      </div>

      <div className="input-box flex items-center justify-center w-full max-w-4xl">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Plan the next itinerary..."
          className="w-[700px] p-3 border border-gray-300 rounded-md"
        />
        <IoIosSend
          className="text-[50px] cursor-pointer text-[#FF6F00] ml-3"
          onClick={hitRequest} // Ensure `hitRequest` is correctly defined and working.
          title="Send"
        />
      </div>

      <p className="mt-5 text-gray-500">
        Itinerary Assistant is powered by Gemini AI.
      </p>
    </div>
  );
};

export default Itinerary;
