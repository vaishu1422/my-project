package com.example.chatwebapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "messages")
public class Message {
    @Id
    private String id;
    private String sender;
    private String receiver; // "all" for group OR username for private
    private String content;
    private String room;     // legacy field (chat-room-1, chat-room-2)
    private String chatId;   // NEW → unique chat identifier (e.g. "room-1" or "Alice_Bob")
    private LocalDateTime timestamp;

    public Message() {}

    public Message(String sender, String receiver, String content, String room, String chatId) {
        this.sender = sender;
        this.receiver = receiver;
        this.content = content;
        this.room = room;
        this.chatId = chatId;
        this.timestamp = LocalDateTime.now();
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getSender() { return sender; }
    public void setSender(String sender) { this.sender = sender; }

    public String getReceiver() { return receiver; }
    public void setReceiver(String receiver) { this.receiver = receiver; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getRoom() { return room; }
    public void setRoom(String room) { this.room = room; }

    public String getChatId() { return chatId; }
    public void setChatId(String chatId) { this.chatId = chatId; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
