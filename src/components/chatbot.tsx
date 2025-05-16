import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { MessageSquare, X } from 'lucide-react';
import './Chatbot.css';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const chatRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const userMessage: Message = { sender: 'user', text: trimmedInput };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const res = await axios.post('http://localhost:5000/api/chat', {
        message: trimmedInput,
      });
      const botMessage: Message = {
        sender: 'bot',
        text: res.data.reply || 'Sorry, I didn’t understand that.',
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Something went wrong. Please try again later.' },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="chatbot-container">
      <button
        className="chat-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle chatbot"
      >
        {isOpen ? <X /> : <MessageSquare />}
      </button>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">Chat Assistant</div>

          <div className="chat-messages" ref={chatRef}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender === 'user' ? 'user' : 'bot'}`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              aria-label="Chat input"
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
