import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getClients } from '../../features/clients/clientSlice';
import { getMessages, sendMessage, resetMessages } from '../../features/messages/messageSlice';
import { Send, User, MessageSquare, Search, MoreVertical, Phone, Video } from 'lucide-react';
import Spinner from '../../components/Spinner';
import './Inbox.css';

const InboxPage = () => {
  const dispatch = useDispatch();
  
  const { clients, isLoading: clientsLoading } = useSelector((state) => state.clients);
  const { messages, isLoading: msgLoading } = useSelector((state) => state.messages);

  const [selectedClient, setSelectedClient] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  useEffect(() => {
    if (selectedClient) {
      dispatch(getMessages(selectedClient._id));
    } else {
      dispatch(resetMessages());
    }
  }, [dispatch, selectedClient]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedClient) return;

    dispatch(sendMessage({
      clientId: selectedClient._id,
      text: newMessage,
      sender: 'user'
    }));
    setNewMessage('');
  };

  if (clientsLoading) return <Spinner />;

  return (
    <div className="inbox-container">
      
      {/* --- LEFT SIDEBAR --- */}
      <div className="inbox-sidebar">
        <div className="inbox-header">
          <h2>Messages</h2>
          <div className="inbox-search">
            <Search size={16} className="search-icon" />
            <input type="text" placeholder="Search chats..." />
          </div>
        </div>
        
        <div className="client-list-scroll">
          {clients.length > 0 ? (
            clients.map((client) => (
              <div 
                key={client._id} 
                className={`chat-client-item ${selectedClient?._id === client._id ? 'active' : ''}`}
                onClick={() => setSelectedClient(client)}
              >
                <div className="chat-avatar-wrapper">
                  <div className="chat-avatar">
                    {client.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="online-status"></span>
                </div>
                <div className="chat-info">
                  <div className="chat-name-row">
                    <h4>{client.name}</h4>
                    <span className="chat-time">12:30 PM</span> {/* Mock time */}
                  </div>
                  <p className="chat-preview">
                    {client.company || 'Freelance Client'}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="empty-list-text">No clients found.</p>
          )}
        </div>
      </div>

      {/* --- RIGHT CHAT AREA --- */}
      <div className="chat-window">
        {selectedClient ? (
          <>
            {/* Header */}
            <div className="chat-window-header">
              <div className="chat-header-info">
                <div className="chat-avatar small">
                  {selectedClient.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3>{selectedClient.name}</h3>
                  <span className="status-text">Online</span>
                </div>
              </div>
              <div className="chat-header-actions">
                <button className="icon-btn"><Phone size={20} /></button>
                <button className="icon-btn"><Video size={20} /></button>
                <button className="icon-btn"><MoreVertical size={20} /></button>
              </div>
            </div>

            {/* Messages */}
            <div className="chat-messages-area">
              <div className="chat-background-pattern"></div>
              {messages.length > 0 ? (
                messages.map((msg) => (
                  <div key={msg._id} className={`message-row ${msg.sender === 'user' ? 'row-user' : 'row-client'}`}>
                     {/* Show avatar for client messages */}
                    {msg.sender !== 'user' && (
                      <div className="message-avatar">
                        {selectedClient.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    
                    <div className={`message-bubble ${msg.sender === 'user' ? 'msg-user' : 'msg-client'}`}>
                      {msg.text}
                      <span className="msg-time">
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-chat">
                  <div className="empty-chat-icon">
                    <MessageSquare size={48} />
                  </div>
                  <p>Start a conversation with {selectedClient.name}</p>
                  <span className="empty-subtext">Say hello! 👋</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="chat-input-wrapper">
              <form className="chat-input-bar" onSubmit={handleSend}>
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit" className="btn-send">
                  <Send size={18} />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="no-chat-selected">
            <div className="no-chat-content">
              <MessageSquare size={64} />
              <h2>Select a client to view messages</h2>
              <p>Choose from your contact list on the left to start chatting.</p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default InboxPage;