import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

export default function Chat() {
  const user = JSON.parse(localStorage.getItem('user')); // get logged-in user
  const userId = user?.id;

  const [recipientId, setRecipientId] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (userId) {
      socket.emit('join', { userId }); // register this user
      socket.on('receive_message', (data) => {
        setMessages((prev) => [...prev, data]);
      });
    }

    return () => {
      socket.off('receive_message');
    };
  }, [userId]);

  const sendMessage = () => {
    if (message.trim() && recipientId.trim()) {
      socket.emit('send_message', {
        senderId: userId,
        recipientId,
        text: message,
      });
      setMessage('');
    }
  };

  return (
    <div style={{ padding: '2rem', color: '#fff' }}>
      <h2>Live Chat</h2>

      {/* 🔽 ADD THIS FIELD to Chat.jsx */}
      <input
        type="text"
        placeholder="Recipient ID"
        value={recipientId}
        onChange={(e) => setRecipientId(e.target.value)}
        style={{ width: '70%', marginBottom: '1rem' }}
      />

      <div style={{ backgroundColor: '#222', padding: '1rem', height: '300px', overflowY: 'scroll', borderRadius: '10px' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ margin: '5px 0' }}>
            <strong>{msg.senderId === userId ? 'You' : msg.senderId}</strong>: {msg.text}
          </div>
        ))}
      </div>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: '70%', padding: '0.5rem', marginTop: '1rem' }}
        placeholder="Type your message"
      />
      <button onClick={sendMessage} style={{ padding: '0.5rem 1rem', marginLeft: '1rem' }}>Send</button>
    </div>
  );
}
