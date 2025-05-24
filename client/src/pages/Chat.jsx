import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Adjust if hosted elsewhere

const Chat = ({ currentUserId, sellerId, onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!currentUserId || !sellerId) return;

    // Join the socket room
    socket.emit('join', { userId: currentUserId });

    // Fetch past messages safely
    const fetchMessages = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/messages/${currentUserId}/${sellerId}`);
        const data = await res.json();

        // Ensure it's an array
        if (Array.isArray(data)) {
          setMessages(data);
        } else {
          console.error('Unexpected data format:', data);
          setMessages([]);
        }
      } catch (err) {
        console.error('Failed to load messages:', err);
        setError('Failed to load messages.');
        setMessages([]);
      }
    };

    fetchMessages();

    // Listen for incoming messages
    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // Clean up the socket connection on unmount
    return () => {
      socket.off('receive_message');
      socket.disconnect();
    };
  }, [currentUserId, sellerId]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      senderId: currentUserId,
      recipientId: sellerId,
      text: message
    };

    // Emit the message
    socket.emit('send_message', newMessage);

    // Show optimistically in chat box
    setMessages((prev) => [...prev, newMessage]);
    setMessage('');
  };

  return (
    <div className="chat-box">
      <div className="chat-header">
        <h4>Chat with Seller</h4>
        <button onClick={onClose}>X</button>
      </div>

      <div className="chat-messages">
        {error && <p className="error">{error}</p>}
        {messages.map((msg, index) => (
          <div key={index} className={msg.senderId === currentUserId ? 'sent' : 'received'}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
