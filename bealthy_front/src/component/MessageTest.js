import React, { useState, useEffect } from 'react';

export const MessageTest = ({ roomName }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    let chatSocket = null;

    useEffect(() => {
        chatSocket = new WebSocket(
            `ws://${window.location.host}/ws/chat/${otherUserId}/`
        );

        chatSocket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            setMessages(messages => [...messages, `${data.sender}: ${data.message}`]);
        };

        chatSocket.onclose = function(e) {
            console.error('Chat socket closed unexpectedly');
        };

        return () => {
            chatSocket.close();
        };
    }, [otherUserId]);

    const sendMessage = () => {
        if (chatSocket && message.trim() !== '') {
            chatSocket.send(JSON.stringify({
                'message': message
            }));
            setMessage('');
        }
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};