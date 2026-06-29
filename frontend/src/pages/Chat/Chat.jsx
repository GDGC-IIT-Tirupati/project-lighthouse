import React, { useEffect } from "react";
import { useState } from "react";
import './chat.css'

function Chat() {
    const [messages, setMessages] = useState(() => {
        const savedChat = sessionStorage.getItem("ticket_chat_cache");
        return savedChat ? JSON.parse(savedChat) : []; 
    });
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
            sessionStorage.setItem("ticket_chat_cache", JSON.stringify(messages))
        }, [messages]);


    const handleSend = async () => {
        if (inputText.trim() === "") return;

        const newMessage = {
            role: 'user',
            content: inputText
        };
    

        const updatedMessages = [...messages, newMessage];

        setMessages(updatedMessages);
        setInputText("");
        setIsLoading(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:8000"}/new_ticket`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({ history: updatedMessages })
            });

            if (!response.ok) {
                throw new Error("Backend server error");
            }


            const data = await response.json();

            setMessages([...updatedMessages, {
                role: "assistant",
                content: data.reply
            }]);

        } catch (error) {
            console.error("Failed to connect to fastapi:", error);
            setMessages([...updatedMessages, {
                role: "assistant",
                content: "Sorry, I am having trouble connecting to the network right now"
            }]);
        } finally {
            setIsLoading(false);
        }
    }

    const handleClear = ()=>{
        sessionStorage.removeItem("ticket_chat_cache")
        setMessages([]);
        setInputText("");
    }

    return (
        <div className="chat-interface">

            <div className="chat-header">
                <button className="clear-btn" onClick={handleClear}>Clear Chat</button>
            </div>


            <div className="message-container">
                {
                    messages.map((msg, index) => (
                        <div key={index} className={`message-bubble ${msg.role}`}>
                            {msg.content}
                        </div>
                    ))
                }
                {isLoading && <div className="message-bubble assistant thinking">AI is thinking...</div>}
            </div>
            <div className="typingbar">
                <input 
                    className="typingarea" 
                    type="text" 
                    value={inputText} 
                    disabled={isLoading}
                    onChange={(e) => setInputText(e.target.value)} 
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
                    placeholder={isLoading ? "Waiting for response..." : "Type your message here..."}
                />
                <div className="send_button" onClick={!isLoading ? handleSend : null}>
                    SEND
                </div>
            </div>
        </div>
    )
}

export default Chat;