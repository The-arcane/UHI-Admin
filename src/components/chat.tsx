// src/components/Chat.tsx
import React, { useState } from 'react';
import axios from 'axios';

const Chat: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [reply, setReply] = useState<string>('');

  const sendMessage = async () => {
    try {
      const res = await axios.post<{ reply: string }>('http://localhost:5000/chat', {
        message: message
      });
      setReply(res.data.reply);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Chat with AI</h2>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type something..."
      />
      <button onClick={sendMessage}>Send</button>

      {reply && (
        <div style={{ marginTop: 20 }}>
          <strong>AI:</strong> {reply}
        </div>
      )}
    </div>
  );
};

export default Chat;
