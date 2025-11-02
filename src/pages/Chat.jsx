import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Chat.css";

// Use window.VITE_GEMINI_API_KEY as a fallback for the environment variable access 
// to ensure the key is accessible in various environments.
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || window.VITE_GEMINI_API_KEY; 

function Chat() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);
  const [user, setUser] = useState(null);
  const [typing, setTyping] = useState(false);
  const [appError, setAppError] = useState(null); // New state for application-level errors
  const chatEndRef = useRef(null);

  // ✅ Scroll to bottom when chat updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  // ✅ Load logged-in user
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      console.error("⚠️ Please login first!");
      // Set a temporary error message instead of alert
      setAppError("⚠️ Authentication required. Redirecting to login...");
      setTimeout(() => navigate("/login"), 1000);
    } else {
      setUser(loggedInUser);
    }
  }, [navigate]);

  // ✅ Send message to Gemini API
  const sendMessage = async () => {
    // Check for API Key BEFORE sending the request
    if (!GEMINI_API_KEY) {
        setAppError("❌ Error: GEMINI_API_KEY is missing. Please set the environment variable.");
        console.error("GEMINI_API_KEY environment variable is not set.");
        return;
    }

    if (!msg.trim()) return;

    // Clear any previous application errors
    setAppError(null);
    const userMessage = { sender: "user", text: msg };
    const newChat = [...chat, userMessage];
    setChat(newChat);
    setMsg("");
    setTyping(true);

    try {
      // 🚀 CORRECTED: Using v1beta and the common model alias 'gemini-2.5-flash' 
      const res = await axios.post(
        // THIS IS THE CORRECTED ENDPOINT
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [{ parts: [{ text: userMessage.text }] }],
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const botReply =
        res.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I didn’t understand that.";

      setChat([...newChat, { sender: "bot", text: botReply }]);
    } catch (error) {
      console.error("API Error Details:", error);
      
      let errorMessage;
      if (error.response?.status === 400) {
        errorMessage = "⚠️ Error 400: Bad Request. Check the prompt format or API response details in the console.";
      } else if (error.response?.status === 403 || error.response?.status === 401) {
        errorMessage = "⚠️ Error 401/403: Invalid API Key, missing permissions, or exceeded rate limits. Please check your Google AI dashboard.";
      } else if (error.response?.status === 404) {
        errorMessage = "⚠️ Error 404: API Endpoint Not Found. The model or path might be incorrect.";
      } else {
        errorMessage = "⚠️ Error: Unable to connect to AI. Check your internet connection or console for details.";
      }

      setChat([
        ...newChat,
        { sender: "bot", text: errorMessage },
      ]);
    } finally {
      setTyping(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div className="container mt-5 chat-container">
      {user && (
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold text-success">
            👋 Hi, {user.username || user.email.split("@")[0]}!
          </h4>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}

      <h5 className="text-center text-primary mb-3">💬 Lifeguard AI Chat</h5>
      
      {/* Display Application-Level Errors */}
      {appError && (
        <div className="alert alert-danger" role="alert">
          {appError}
        </div>
      )}

      <div className="chat-box d-flex flex-column shadow-sm">
        {chat.map((c, i) => (
          <div
            key={i}
            className={`message-bubble ${
              c.sender === "user" ? "user-bubble" : "bot-bubble"
            }`}
          >
            <div className="message-text">{c.text}</div>
          </div>
        ))}

        {typing && (
          <div className="bot-bubble typing-indicator">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="input-group mt-3">
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="form-control"
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          disabled={typing}
        />
        <button onClick={sendMessage} className="btn btn-success" disabled={typing}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;