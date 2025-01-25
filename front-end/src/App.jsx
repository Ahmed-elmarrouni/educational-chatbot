import React, { useState, useEffect, useRef } from "react";
import { FiSend } from "react-icons/fi";
import { FaUser, FaRobot } from "react-icons/fa";
import "./App.css";
import axios from "axios";

const App = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);

  const suggestions = [
    "Qu'est-ce qu'un algorithme ?",
    "Exemples d'algorithmes",
    "Qu'est-ce que Python ?",
    "Qu'est-ce qu'une base de données ?",
  ];

  const fetchAnswer = async (query) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/ask", { text: query });
      return response.data;
    } catch (error) {
      console.error("Error fetching answer:", error);
      return {
        answer: "Une erreur est survenue. Veuillez réessayer.",
        suggestions: [],
      };
    }
  };

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (question.trim()) {
      const userMessage = { sender: "user", text: question };
      const response = await fetchAnswer(question);
      const botResponse = {
        sender: "bot",
        text: response.answer,
        suggestions: response.suggestions,
      };

      setMessages((prevMessages) => [...prevMessages, userMessage, botResponse]);
      setQuestion("");
    }
  };

  const handleSuggestionClick = async (suggestion) => {
    const userMessage = { sender: "user", text: suggestion };
    const response = await fetchAnswer(suggestion);
    const botResponse = {
      sender: "bot",
      text: response.answer,
      suggestions: response.suggestions,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage, botResponse]);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      setTimeout(() => {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }, 0);
    }
  }, [messages]);

  return (
    <div className="app">
      <div className="logo">Educational ChatBot</div>

      <div className="chat-container" ref={chatContainerRef}>
        {messages.map((message, index) => (
          <div className={`chat-bubble ${message.sender === "user" ? "user" : "bot"}`}>
            <div
              className={`profile-icon ${message.sender === "user" ? "user-icon" : "bot-icon"
                }`}
            >
              {message.sender === "user" ? (
                <FaUser size={20} color="#ffffff" />
              ) : (
                <FaRobot size={20} color="#ffffff" />
              )}
            </div>
            <div className="message-content">
              {message.sender === "bot" ? (
                <div>
                  <p className="bot-paragraph">{message.text}</p>
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div id="message-suggestions" className="suggestions">
                      <p className="suggestions-title">Suggestions:</p>
                      <ul>
                        {message.suggestions.map((suggestion, i) => (
                          <li key={i} onClick={() => handleSuggestionClick(suggestion)}>
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <p>{message.text}</p>
              )}
            </div>
          </div>



        ))}
      </div>

      {messages.length === 0 && (
        <div id="initial-suggestions" className="suggestions">
          {suggestions.map((suggestion, index) => (
            <button key={index} className="suggestion" onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="question-form">
        <input
          type="text"
          placeholder="Message edu-bot"
          value={question}
          onChange={handleInputChange}
          className="question-input"
        />
        <button type="submit" className="submit-btn">
          <FiSend size={20} />
        </button>
      </form>
    </div>
  );
};

export default App;
